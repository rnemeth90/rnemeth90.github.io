---
title: 'Kubernetes 1.31 Upgrade'
date: '2025-03-26T09:00:00+00:00'
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

Another entry in the ongoing Kubernetes version treadmill, this time moving to 1.31. This upgrade was sequenced deliberately behind a separate networking project (a NAT gateway rollout) that needed to land first, since it touched the same clusters and we wanted to avoid stacking two risky changes on top of each other at once.

Sequencing matters a lot in infrastructure work — it's tempting to parallelize everything to move faster, but when two projects touch the same blast radius, doing them in a deliberate order (and confirming the first is stable before starting the second) is usually the safer bet, even if it means the calendar slips a bit.
