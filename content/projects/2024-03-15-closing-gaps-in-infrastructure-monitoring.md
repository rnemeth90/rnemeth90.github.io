---
title: 'Closing Gaps in Infrastructure and Application Monitoring'
date: '2024-03-15T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - devops
    - monitoring
    - alerting
    - azure
---

Infrastructure evolves fast, and monitoring coverage always lags behind. Full review of what we were actually monitoring to find and close the gaps in alerting and visibility.

Problem was simple: as our footprint grew, metrics coverage didn't keep up. Blind spots on CPU, memory, disk, network throughput on various resources. Assessed everything, implemented missing alerting, wrote response procedures.

Pairing every new alert with "here's what you do when this fires" was as important as the alert itself. An alert with no playbook is just noise.
