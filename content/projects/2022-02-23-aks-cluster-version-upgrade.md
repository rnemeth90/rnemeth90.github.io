---
title: 'Upgrading AKS Clusters to a Supported Kubernetes Version'
date: '2022-02-23T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
---

One of the recurring themes of running Kubernetes in production is that clusters age out of support fairly quickly. Azure Kubernetes Service (AKS), at the time of this writing, only supports a rolling window of Kubernetes minor versions, so falling behind means losing patch support and eventually being forced into an emergency upgrade.

This project was a routine but important control-plane and node-pool upgrade across our AKS clusters to bring them onto a supported Kubernetes version (1.21.x at the time). The work itself followed a pattern we've refined over several of these upgrades:

1. Review the Kubernetes changelog and deprecated API list for the target version.
2. Upgrade a non-production cluster first and run our standard smoke tests.
3. Upgrade the control plane, then roll node pools one at a time to avoid workload disruption.
4. Validate ingress, autoscaling, and monitoring after each node pool rolls.

This was a multi-cluster, multi-region process that took several weeks (and maintenance windows) to complete.
