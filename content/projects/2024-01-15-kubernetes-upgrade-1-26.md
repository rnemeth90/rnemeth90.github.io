---
title: 'Kubernetes 1.26 Upgrade and API Deprecation Cleanup'
date: '2024-01-15T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
---

Another cycle of the Kubernetes upgrade treadmill — moving our clusters from 1.25 to 1.26. These upgrades are never purely mechanical; each Kubernetes minor version tends to remove or graduate a handful of APIs, and if anything in your manifests, Helm charts, or controllers is still using a removed API, the upgrade will break it.

For this upgrade, the notable deprecation to watch for was the removal of the autoscaling/v2beta2 API in favor of the stable autoscaling/v2. Before touching any cluster, I audited our manifests and third-party Helm charts for anything still referencing the beta API, and worked through vendor documentation and known Azure platform issues for this version to understand what else might bite us during the rollout.

As with our other Kubernetes upgrades, the rollout followed our standard non-prod-first, node-pool-by-node-pool pattern with validation checkpoints along the way. Keeping a running list of "known issues for this version" pulled from vendor docs and cloud provider advisories before starting is one of the habits that's saved us from avoidable surprises on more than one of these upgrades.
