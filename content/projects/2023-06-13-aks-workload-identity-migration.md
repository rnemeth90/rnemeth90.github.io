---
title: 'Migrating AKS Workloads to Azure Workload Identity'
date: '2023-06-13T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
    - security
    - identity
---

For a long time, the standard way for a pod in AKS to authenticate to Azure resources (Key Vault, databases, service bus, etc.) was some flavor of managed identity binding via a sidecar (AAD Pod Identity), or worse, credentials baked into a secret. Azure Workload Identity is the modern replacement: it federates a Kubernetes service account with an Azure AD identity using OIDC, with no secrets to manage or rotate.

This project moved a first batch of services over to Workload Identity. We deliberately split the work into two phases based on complexity - this first pass targeted the simpler, more straightforward services, with a follow-up phase planned for services with more complex identity requirements.

The benefits were immediate:
- No more managing and rotating secrets for service-to-Azure authentication.
- Reduced blast radius - each workload gets scoped, short-lived tokens instead of a shared credential.
- Less operational overhead overall, since there's no secret expiration to track and no pod-identity sidecar to babysit.

