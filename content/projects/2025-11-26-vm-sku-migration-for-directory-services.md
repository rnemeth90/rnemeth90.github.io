---
title: 'Migrating Directory Services VMs Ahead of a SKU Deprecation'
date: '2025-11-26T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - azure
    - networking
    - migration
---

Directory services infrastructure was running on an Azure VM SKU that was being phased out. The reservation was expiring and Microsoft was deprecating the whole series, so we needed to migrate before the deadline.

Two things mattered beyond just picking a cheaper SKU: the replacement series doesn't have temporary local storage, which we confirmed we didn't actually need. And critically, directory services workloads can't handle spot evictions, so we had to explicitly configure for standard (non-evictable) priority - easy to miss if you're just optimizing for cost.

It's a reminder that "cheaper VM" isn't free - you have to verify the replacement's features and pricing model actually fit what the workload needs.
