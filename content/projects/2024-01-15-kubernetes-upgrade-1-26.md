---
title: 'Kubernetes 1.26 Upgrade and API Deprecation Cleanup'
date: '2024-01-15T09:00:00+00:00'
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

Every Kubernetes minor version bump is a small adventure in finding deprecated APIs lurking in your manifests, Helm charts, and third-party controllers. Move from 1.25 to 1.26 and something's going to break if you're not careful.

The big gotcha for this cycle was autoscaling/v2beta2 getting axed in favor of the stable autoscaling/v2 API. I went through our manifests and every Helm chart we use to catch anything still on the beta version before we touched a single cluster. I also dug into the Azure advisories for this version since cloud providers always have some surprises lurking.

The actual upgrade followed our standard playbook - non-prod first, one node pool at a time, validation steps in between. The thing that's saved us more than once is doing the homework upfront: pull together all the known issues for the version from vendor docs and cloud advisories, work through them before starting the rollout, and you'll sidestep half the surprises.
