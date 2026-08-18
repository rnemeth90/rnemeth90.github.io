---
title: 'Kubernetes 1.31 Upgrade'
date: '2025-03-26T09:00:00+00:00'
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

Kubernetes 1.31 upgrade. Deliberately sequenced behind a NAT gateway rollout that touched the same clusters - didn't want to stack two risky changes on top of each other at once.

Sequencing matters in infrastructure work. Tempting to parallelize everything, but when two projects hit the same blast radius, doing them in order and confirming stability between is safer, even if the calendar slips a bit.
