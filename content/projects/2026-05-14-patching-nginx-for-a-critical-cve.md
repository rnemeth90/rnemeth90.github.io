---
title: 'Emergency Patching of Nginx VM Scale Sets and Kubernetes Nodes for a Critical CVE'
date: '2026-05-14T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - security
    - nginx
    - kubernetes
    - azure
    - cve
---

Critical CVE in Linux copy_file_range hit both Nginx VMs and AKS Linux nodes. Multiple scale sets, multiple clusters, spanning production, RC, test, and lab. Need to patch everything in the blast radius.

Production gets the formal process - change request, off-hours patching to minimize maintenance window impact. Lab and test can move faster. Scope was big, but having a clear map of what's affected and what process each environment needs let us move fast where we could and be deliberate where it mattered.
