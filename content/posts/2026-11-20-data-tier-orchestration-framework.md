---
title: "Designing a Declarative Data Tier Framework in PowerShell"
date: '2026-11-20T16:01:00+00:00'
author: Ryan
layout: post
draft: true
categories:
- DevOps
- PowerShell
- Azure
- Architecture
- Automation
---

# Designing a Declarative Data Tier Framework in PowerShell

If you run a multi-tenant platform on Azure, you eventually have to answer a boring but important question: *how does a new tenant get its databases, storage, users, and configuration?*

The answer usually starts as a handful of scripts. Then it becomes a folder of scripts. Then every service has its own copy of the "create a database" logic, three different ways of reading secrets, and a release pipeline nobody wants to touch.

This post walks through the architecture of a framework I helped build to replace that mess. It's a PowerShell-based orchestrator where each service **declares** what it needs and a central engine **executes** it. I'll cover the design goals, how execution flows end to end, how placeholders are resolved, how actions and providers are layered, and how we made it safe to develop and migrate.

---

## Design Goals

Before writing any code, we agreed on a few goals:

- **One entry point** with as little logic as possible
- **Scope-aware** execution from a single script (more on scopes below)
- **Declarative, service-owned definitions** — services say *what*, not *how*
- **Extensible** — services can ship custom actions next to the built-in ones
- **Dry-run support** (`-WhatIf`) across everything
- **Local parity** — you can run the same thing on your laptop that the pipeline runs

---

## The Big Picture

The framework has three layers:

```
Orchestrator          Invoke-DataTier.ps1
   │
   ├── Actions        _actions/*.ps1       (what to do)
   │
   ├── Providers      _providers/*         (how to talk to Azure)
   │
   └── Utilities      common/utility/*     (logging, URLs, helpers)
```

And the folder layout looks like this:

```
data-tier/
├── code/
│   ├── Invoke-DataTier.ps1       # The orchestrator
│   ├── _actions/                 # Built-in action handlers
│   │   └── validation/
│   ├── _providers/               # Low-level Azure functions
│   │   ├── database/azure/
│   │   ├── dataServer/azure/
│   │   ├── keyvault/
│   │   └── storageAccount/azure/
│   └── common/utility/           # Shared helpers
├── tools/                        # Local runner and diagnostics
├── Makefile                      # Local dev shortcuts
└── readme.md
```

The separation matters. **Actions** know nothing about REST calls or connection strings. **Providers** know nothing about tenants or business rules. The orchestrator knows about neither — it just wires them together.

---

## Scopes: Tenant, Ring, and Global

The framework runs at one of three scopes, and it's invoked once per scope per pipeline run:

| Scope  | What it's for                                           |
|--------|---------------------------------------------------------|
| Global | Things shared across everything (platform-wide settings)|
| Ring   | Things shared by a group of tenants (a deployment ring) |
| Tenant | Things specific to a single customer                    |

The same entry point handles all three. The scope simply decides which configuration script each service gets asked for.

---

## How Services Plug In

Every service repo follows a convention. It ships three scripts:

```
{service-repo}/
└── deploy/
    ├── global-configuration.ps1
    ├── ring-configuration.ps1
    └── tenant-configuration.ps1
```

During a pipeline run, these land in the build workspace as artifacts. The orchestrator is told which services exist and in what order:

```powershell
./Invoke-DataTier.ps1 `
  -ArtifactRoot $(Pipeline.Workspace) `
  -ServiceInstallOrder "service-a;service-b" `
  -Scope Tenant `
  -Cloud commercial `
  -Environment prod `
  -Region us1 `
  -Ring ring-01 `
  -Tenant tenant-123 `
  -Variables $variables
```

For each service, in order, it calls `{scope}-configuration.ps1` with the same set of parameters (cloud, environment, region, ring, tenant, and a hashtable of variables).

The contract is simple: **the script returns an array of action hashtables**. That's it.

```powershell
# deploy/tenant-configuration.ps1
param($Cloud, $Environment, $Region, $Ring, $Tenant, [hashtable]$Variables)

$actions = @()

$actions += @{
    Type         = "Create-SqlDatabase"
    ServerName   = $Variables.SqlServerName
    DatabaseName = "myservice_${Tenant}_db"
    ElasticPool  = $Variables.SqlElasticPool
}

$actions += @{
    Type        = "Set-Configuration"
    Key         = "tenants:${Tenant}:apiToken"
    Value       = "#{MyServiceApiToken}#"
    IsSensitive = $true
}

return $actions
```

Because it's just PowerShell, services can use `if` statements, loops, and helper functions to decide what to return. Nested arrays are flattened one level by the orchestrator, so conditional blocks are easy:

```powershell
@(
    @{ Type = "Set-Configuration"; Key = "clusters:${Ring}:version"; Value = $Variables.BuildNumber }

    if ($Environment -eq 'prod') {
        @{ Type = "Set-Configuration"; Key = "clusters:${Ring}:maintenanceWindow"; Value = "02:00-04:00" }
    }
)
```

---

## Execution Flow

The orchestrator runs in two phases: **collect**, then **execute**.

```
Invoke-DataTier.ps1 (Scope = Tenant | Ring | Global)
  │
  ├── Phase 1: Collect
  │     For each service in ServiceInstallOrder:
  │       ├── Load the service's PowerShell modules
  │       ├── Call {scope}-configuration.ps1
  │       └── Tag every returned action with the service name
  │
  ├── Append any pipeline-supplied "additional actions"
  │
  └── Phase 2: Execute
        For each collected action:
          ├── Find the handler (_actions/{Type}.ps1, else the service's own)
          ├── Resolve #{placeholders}# in the action's string properties
          └── Run the handler with -Action and -Variables
```

A few details worth calling out.

### Collecting first, executing second

Gathering *all* actions before running *any* of them means a broken configuration script is discovered before anything is written to Azure. A failure in one service's script is logged, the run continues collecting from the rest, and the whole run is marked failed at the end.

### Handler lookup

Each action has a `Type` that maps directly to a filename. The orchestrator looks in the built-in `_actions` folder first. If it doesn't find a handler there, it falls back to the service's own `deploy/_actions` folder. That's the extension mechanism: a service that needs something unusual ships its own handler without touching the shared framework.

### Error handling

Each action runs inside its own `try/catch`. By default, a failure marks the run as failed but later actions still run, so you see every problem at once instead of fixing them one at a time. An action can opt out with `ContinueOnError = $true`. At the end, the orchestrator logs a summary (failed / successful / total, plus duration) and exits non-zero if anything failed.

---

## Placeholders: The Heart of the Design

Actions are data, and data shouldn't need to know where secrets live. So instead of hardcoding lookups, action properties can contain placeholders:

```
#{VariableName}#
#{VariableName|default}#
#{outer--#{inner}#--key}#
```

Right before an action executes, the orchestrator walks every string property and resolves them.

### Resolution order

For each placeholder, the engine looks in this order:

1. The `$Variables` hashtable (values injected by the pipeline, plus anything resolved earlier in the run)
2. Environment variables
3. The **regional** deploy Key Vault
4. The **global** deploy Key Vault

Once a value is found in a vault, it's cached into `$Variables`, so the same secret is only fetched once per run.

### Defaults

Add `|default` and the engine falls back to that value when nothing is found:

```
#{StorageTier|standard}#
```

If there's no default and nothing resolves, the action fails with a precise message naming the placeholder, the action type, and the service. This turns "something is missing somewhere" into a one-line error.

### Nested placeholders

Placeholders can contain other placeholders. The regex only matches *leaf* placeholders (names can't contain `{` or `}`), so each pass resolves the innermost ones first and then repeats:

```
"#{ring-01--#{tenants--tenant-123--storagetier}#--key}#"
```

Pass one resolves the inner `#{tenants--tenant-123--storagetier}#`. Pass two resolves the outer one using that result. A depth limit of 10 passes protects against malformed or circular references, and if anything is left unresolved after that, the action fails loudly.

### Why this is nice

- **Environment overrides come from naming.** Prefixing a vault secret with a ring or environment name lets it override a generic one, with no code changes.
- **Services stay decoupled** from where secrets live.
- **Late binding works.** An early action can set variables that later actions reference in their placeholders.

---

## Built-in Actions

Every handler receives two arguments, `$Action` and `$Variables`. The built-in set covers the common needs:

| Action                  | What it does                                               |
|-------------------------|------------------------------------------------------------|
| `Set-Configuration`     | Writes a value to Key Vault (sensitive) or Table Storage   |
| `Remove-Configuration`  | Deletes a value from either                                |
| `Create-SqlDatabase`    | Creates an Azure SQL database, optionally in an elastic pool |
| `Create-SqlUser`        | Creates a SQL or Entra ID user, assigns roles/permissions  |
| `Run-SqlScript`         | Runs a T-SQL statement (query or non-query)                |
| `New-StorageContainer`  | Creates a blob container                                   |
| `Copy-FileToStorageBlob`| Uploads a file to a blob                                   |
| `Invoke-Command`        | Runs a script, executable, or script block                 |
| `Resolve-Variable`      | Resolves a variable (with optional default) for later actions |
| `Resolve-StorageTier`   | Resolves a tenant's storage settings into variables        |

### Idempotency everywhere

The most important property of these handlers is that they're **safe to run again**. `Create-SqlDatabase` checks for existence first. `New-StorageContainer` and `Copy-FileToStorageBlob` skip when the target already exists. A re-run after a partial failure just finishes the job.

### Configuration storage and key format

`Set-Configuration` is a good example of a handler that hides a lot of detail. Configuration keys are colon-delimited, and the key's shape decides where the value goes:

| Scope     | Key format                  | Table storage location                              |
|-----------|-----------------------------|-----------------------------------------------------|
| Global    | `property`                  | PartitionKey `__global__`, RowKey `property`        |
| Tenant    | `tenants:{id}:property`     | PartitionKey `tenants:{id}`, RowKey `property`      |
| Ring      | `clusters:{id}:property`    | PartitionKey `clusters:{id}`, RowKey `property`     |

Non-sensitive values go to Table Storage. Anything marked `IsSensitive` goes to Key Vault instead, where colons are converted to double dashes (`tenants--{id}--secret`) because Key Vault names can't contain colons.

### Late-bound storage settings

`Resolve-StorageTier` shows how actions can feed each other. A service returns it first, and it populates `$Variables` with entries like `StorageTier.AssetStorageAccount`. Later actions then reference those with ordinary placeholders:

```powershell
@{ Type = "Resolve-StorageTier"; Environment = $Environment; Region = $Region; Tenant = $Tenant }

@{
    Type               = "New-StorageContainer"
    StorageAccountName = "#{StorageTier.AssetStorageAccount}#"
    ContainerName      = "#{StorageTier.AssetContainer}#"
}
```

### Validation

Handlers call a shared `Confirm-ActionIsValid` helper first. It checks that required action parameters and required variables are present and non-empty, and warns about whatever is missing. Bad input fails early, before any Azure call.

---

## Providers: The Azure Layer

Actions never call Azure directly. They go through a **Providers** module, grouped by resource type:

- **Database** — check existence, deploy a database, run query / non-query / scalar commands
- **SQL server** — open connections (including managed identity), create users, grant roles and permissions
- **Key Vault** — set and remove secrets
- **Storage account** — check accounts/containers/blobs, deploy containers, read and write table rows

A couple of design choices here paid off.

### Managed identity over keys

SQL connections use Azure AD default authentication. Table Storage access uses OAuth bearer tokens against the REST API rather than account keys. Fewer secrets in the pipeline means fewer secrets to leak or rotate.

### Pure selection logic

When creating a database in a group of elastic pools, the choice of pool is its own pure function with no Azure calls. It skips pools above a CPU threshold, weights the rest by how far each is below a proportional target, and adds a "burst allowance" so that databases created in parallel don't all pile into the same pool. Because it's pure, it's trivial to unit test.

---

## Utilities and Logging

A shared utility module provides helpers every handler can use. The most useful is a structured logger. Before each action runs, the orchestrator sets a log context so every line is prefixed:

```
[Tenant][Create-SqlDatabase][service-a] Database already exists, skipping.
```

When something fails at 2 a.m., being able to see the scope, action type, and owning service in a single line is worth a lot.

The orchestrator also re-imports the shared utility module *after* loading each service's modules, so a service's module can't accidentally shadow a shared function with a conflicting signature. That one cost us an afternoon.

---

## Local Development

A framework nobody can run locally is a framework nobody trusts. So there's a local runner that calls the same orchestrator with the same variables the pipeline injects, pulling secrets from a lab vault.

A symlink-based artifact layout mirrors the structure the pipeline downloads, so edits in your service repos show up immediately:

```
~/artifacts/data-tier/
├── service-a/drop/deploy  -> ~/repos/service-a/deploy
├── service-b/drop/deploy  -> ~/repos/service-b/deploy
└── ...
```

A small `Makefile` wraps it all:

```bash
make artifacts                                   # build the symlink layout
make test                                        # run Pester unit tests
make dry-run RING=ring-01 SCOPE=Ring             # -WhatIf, no writes
make run RING=ring-01 SCOPE=Tenant TENANT=t-123  # real run
```

Dry-run is the star here. Because every handler guards writes with `$PSCmdlet.ShouldProcess(...)`, `-WhatIf` flows all the way down and you can see exactly what *would* happen. Even `Invoke-Command` forwards `-WhatIf` to child scripts.

There are also a few diagnostic tools: export table rows to CSV, back up a table to JSON, and compare Key Vault secrets or table rows between two tenants. That last one has been a lifesaver for "why does this tenant behave differently?" investigations.

---

## Rolling It Out Safely

The framework is only half the story. Getting it into an existing classic release pipeline was the other half, and a few lessons stand out.

### Feature-flag the migration

We added a `NewDataTier` variable that defaults to `false`. When it's true, the new tasks run and the legacy ones are skipped. That let us test on one tenant while everything else kept using the old path.

### Most failures were data, not code

Nearly every failure during rollout was a gap in the environment rather than a bug in the framework:

- A secret that existed in one environment but not another
- A variable the old scripts got for free from the pipeline
- A stale PowerShell module on the build agent
- Secret variables in classic releases that aren't exposed to scripts unless explicitly referenced

Strict placeholder resolution turned each of these into a clear, specific error, which is exactly what we wanted.

### Test with a fresh release every time

In classic release pipelines, redeploying an existing release reuses a frozen snapshot of the tasks. If you edit the definition, your fix won't be picked up. Create a *new* release for each test.

### Delete old code carefully

Once the new process was proven, we removed the legacy scripts. But "old" doesn't always mean "dead" — some code was still used in places we didn't expect, and a few repos needed to dual-maintain both approaches during the transition. Verify each file before deleting it.

---

## Summary

The architecture comes down to a few ideas:

- **Services declare, the framework executes.** Each service returns a list of action hashtables.
- **Three scopes, one entry point.** Global, Ring, and Tenant share the same orchestrator.
- **Collect, then execute.** Problems surface before anything is written.
- **Placeholders decouple data from secrets.** A single resolver handles variables, environment, and vaults, with defaults and nesting.
- **Actions are idempotent and validated.** Re-runs are safe and bad input fails early.
- **Providers isolate Azure.** Managed identity and OAuth instead of keys.
- **Local parity and dry-run.** If you can't run it on your laptop, you can't trust it.

If your provisioning story has started to feel like a junk drawer of scripts, a declarative layer like this is worth the investment.
