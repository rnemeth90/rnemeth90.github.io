---
title: 'Migrating Azure Public IPs from Basic to Standard SKU'
date: '2025-06-11T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - azure
    - networking
    - security
---

Microsoft has been deprecating Basic SKU Public IP addresses across Azure, with Standard SKU as the required replacement going forward. This project covered upgrading all of our existing Basic SKU public IPs to Standard SKU ahead of that deprecation, following Azure's best-practice recommendations.

The scope covered essentially every Basic public IP in our footprint, with one deliberate carve-out: IPs associated with a specific vendor firewall appliance were excluded, since that vendor's resources had their own separate upgrade path and requirements outside the scope of this project.

Standard SKU IPs come with better default security posture (they're secure by default, requiring an explicit NSG rule to allow traffic, versus Basic's more permissive default) and better resiliency, so beyond just avoiding the deprecation cliff, this was a straightforward net improvement to our network security posture.
