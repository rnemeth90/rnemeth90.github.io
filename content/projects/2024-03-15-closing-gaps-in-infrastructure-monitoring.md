---
title: 'Closing Gaps in Infrastructure and Application Monitoring'
date: '2024-03-15T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - devops
    - monitoring
    - alerting
    - azure
---

As infrastructure evolves quickly — new services, new clusters, new patterns — monitoring coverage has a tendency to lag behind. This project was a deliberate, systematic effort to catch up: a full review of our infrastructure and application monitoring to find and close gaps in alerting and performance visibility.

The core problem was straightforward: as our footprint changed, our metrics coverage hadn't kept pace, leaving blind spots around fundamentals like CPU, memory, disk usage, and network throughput on some resources. The project involved a full assessment across our cloud footprint to identify exactly where those metrics were missing, followed by implementing the missing alerting and writing standard operating procedures for how to respond when those new alerts fired.

The SOP piece mattered as much as the alerting itself — an alert that fires with no documented response plan just becomes noise. Pairing every new alert with "here's what you do when this fires" made the monitoring investment actually actionable for whoever was on call.
