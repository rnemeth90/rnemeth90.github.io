---
title: 'Rolling Out New AKS Clusters to Retire Duplicate Infrastructure'
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
    - cost-optimization
---

Over time, infrastructure accumulates cruft - clusters stood up for a specific purpose that never got cleaned up, duplicate environments left over from a migration, that sort of thing. This project stood up a new generation of AKS clusters specifically so we could decommission an older, duplicate set of infrastructure that was quietly costing money every month.

The approach was straightforward: build the new clusters alongside the old ones, migrate workloads over, validate, and then tear down the legacy infrastructure. Running both environments in parallel for a short overlap period had a real (if temporary) cost - a few thousand dollars over a couple of months - but it bought us a safe cutover with a rollback path, which was worth it compared to the ongoing cost of carrying duplicate infrastructure indefinitely.

It's a small project on paper, but it's a good illustration of a pattern I use a lot: pay a little extra for a short-lived safety net during a migration rather than trying to do a risky in-place cutover.
