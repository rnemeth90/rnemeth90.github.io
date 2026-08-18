---
title: 'DnsPinger: A Small .NET Tool for Diagnosing DNS Issues in Kubernetes'
date: '2026-08-17T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - dotnet
    - kubernetes
    - dns
    - observability
    - csharp
---

DNS problems in Kubernetes are some of the most frustrating issues to chase down. They're often intermittent, they can differ by node, by node pool, by which resolver actually answered the query, and the standard toolbox (`nslookup`/`dig` run once by hand) doesn't tell you much about a problem that only shows up 1% of the time or only on certain nodes. I got tired of manually reproducing DNS flakiness during incidents, so I wrote **DnsPinger** — a small, purpose-built .NET console application that continuously exercises DNS resolution from inside the cluster and reports what it finds.

## What it does

At its core, DnsPinger runs a simple loop: on a fixed interval, it resolves a configurable list of domain names using multiple resolvers in parallel, and reports the result (success/failure, number of records returned, and how long the lookup took) as telemetry. It's designed to run continuously as a long-lived pod (deployed via daemon-set), rather than as a one-off diagnostic you run manually when something's already on fire — the value is in having a continuous baseline so you can see exactly when resolution started failing or slowing down, on which node, against which resolver.

A few design details worth calling out:

- **Pluggable resolvers.** DnsPinger supports the built-in .NET resolver (`Dns.GetHostEntry`) as well as one or more custom resolvers pointed at specific DNS server IPs, via the `DnsClient` library. This matters because in Kubernetes, "DNS isn't working" can mean different things depending on whether the problem is with the cluster's DNS service, an upstream resolver, or something node-specific — running the same lookup through multiple resolvers side-by-side isolates which layer is actually failing.
- **Environment-variable driven configuration.** Everything — which domains to resolve, which custom resolvers to use and their IPs, a region label, and arbitrary custom telemetry dimensions — is configured through environment variables. That makes it trivial to deploy the same container image with different configurations to different node pools or environments via Helm values, without a rebuild.
- **Application Insights telemetry.** Every lookup attempt is reported as a telemetry event with dimensions (resolver used, domain, region, success/failure, custom tags) and metrics (result count, time taken). That turns "is DNS broken right now" from a guessing game into a dashboard/query you can filter by node pool, resolver, or time window.
- **ICMP/NIC statistics.** Alongside DNS lookups, it periodically reports network interface ICMP statistics (echo requests/replies, unreachable messages, etc.), which has been useful for correlating DNS failures with broader network-layer symptoms rather than assuming every failure is DNS-specific.

## Why a custom tool instead of existing options

There are off-the-shelf DNS monitoring tools, but most are built to monitor DNS from the outside (synthetic checks against public records) rather than from inside a cluster's own network, resolving the cluster's own internal and external dependencies through the cluster's own resolver chain. Writing something purpose-built meant I could tune it exactly to the failure modes I actually cared about — resolver-specific comparisons (OpenDNS, Google, in-cluster coredns, etc.) for each node and custom telemetry dimensions with long-term retention for behavioral analysis over days/weeks/months.

## Where it's deployed

DnsPinger runs as a lightweight, always-on pod across a handful of node pools (both Windows and Linux), each with its own Helm values file so region/resolver/domain configuration can be tuned per pool without touching code. It's been genuinely useful during past DNS-flakiness investigations — instead of trying to reproduce an intermittent issue by hand while everyone's watching, I can just go pull up the telemetry and see exactly which resolver, which node pool, and what time window was affected.

This one didn't come out of a formal planning process or a tracked work item — it was a "let me just build the tool I wish I had" project born out of one too many frustrating DNS troubleshooting sessions, and it stuck around for a long-time while we debugged countless DNS resolution failures in our cluster!

