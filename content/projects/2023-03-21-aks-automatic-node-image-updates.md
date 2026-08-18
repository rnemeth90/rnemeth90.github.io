---
title: 'Diagnosing and Safely Re-enabling AKS Automatic Node Image Updates'
date: '2023-03-21T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
    - reliability
---

AKS has a feature that automatically applies the latest node image to your node pools on a schedule. It's a great way to stay current on OS-level patches without manual intervention - until it causes a service degradation in prod.

After an automatic node image rollout caused instability in one of our environments, we disabled the feature while we investigated with Microsoft support. No definitive root cause was found, but the support engagement did produce some useful recommendations around additional node-level logging to capture if the issue recurred.

Rather than leaving the feature off indefinitely (and quietly falling behind on node patching), I put together a plan to re-enable it safely:

- Turn on the additional diagnostic logging Microsoft recommended, scoped to a single cluster first.
- Schedule the node image update during a low-traffic maintenance window (Friday evening/Saturday morning).
- If the issue reproduced, we'd have the artifacts needed to reopen the support case with real evidence.
- Once we had a few clean cycles, extend the same schedule to the rest of the fleet.
