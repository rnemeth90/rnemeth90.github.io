---
title: 'Migrating Azure Public IPs from Basic to Standard SKU'
date: '2025-06-11T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - azure
    - networking
    - security
---

Azure is deprecating Basic SKU Public IPs, so we needed to upgrade everything to Standard SKU. Pretty straightforward migration, with the only carve-out being IPs tied to a vendor firewall appliance that had its own upgrade path.

Beyond just staying ahead of deprecation, Standard SKU is more secure by default - it requires explicit NSG rules to allow traffic instead of Basic's wide-open defaults - plus better resiliency overall. Net improvement to our network security posture.
