---
title: 'Migrating Directory Services VMs Ahead of a SKU Deprecation'
date: '2025-11-26T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - azure
    - networking
    - migration
---

Our managed directory services infrastructure was running on an Azure VM SKU whose reservation was expiring, and the SKU itself (along with a related series) was being phased out by Microsoft. Waiting until the deprecation forced our hand wasn't an option, so this project got ahead of it with a planned migration to a supported, cost-effective replacement SKU.

A couple of details mattered here beyond "just pick a new SKU": the replacement series doesn't include temporary local storage, which we confirmed wasn't actually needed for this workload, so we didn't pay for capability we wouldn't use. And critically, these directory services workloads can't tolerate eviction, so every new deployment had to be explicitly configured for standard (regular) priority rather than spot or low-priority — an easy thing to get wrong if you're optimizing for cost without considering workload requirements.

A good reminder that "cheaper VM SKU" isn't always a free lunch — you have to validate that the replacement's feature set (or lack thereof) and pricing model actually match what the workload needs.
