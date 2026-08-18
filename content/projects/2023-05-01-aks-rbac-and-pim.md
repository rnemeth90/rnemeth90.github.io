---
title: 'Locking Down AKS Access with Azure RBAC and Privileged Identity Management'
date: '2023-05-01T09:00:00+00:00'
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
    - rbac
---

Kubernetes' built-in RBAC is powerful, but managing it purely inside the cluster (via kubeconfigs and static role bindings) doesn't integrate well with how most organizations manage identity and access at the directory level. Azure RBAC integration for AKS lets you manage cluster access using Azure AD groups and role assignments, which is a much better fit for how access reviews and least-privilege policies actually get enforced.

This project deployed Azure RBAC to our AKS clusters so that cluster access is controlled the same way as the rest of our Azure resources, and paired it with Privileged Identity Management (PIM) so that elevated cluster permissions are just-in-time and time-bound rather than standing access.

The net effect: no more static, long-lived kubeconfig credentials floating around with broad permissions. Engineers request elevated access when they need it, it's approved and time-boxed, and it's automatically revoked.
