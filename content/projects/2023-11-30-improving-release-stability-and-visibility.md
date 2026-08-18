---
title: 'Improving Release Environment Stability Through Proactive Monitoring'
date: '2023-11-30T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - devops
    - monitoring
    - reliability
---

Non-production release environments (the environments where new builds land before hitting production) tend to get less monitoring attention than production itself, which is backwards — instability there directly slows down every team that depends on them to validate their work.

The goal of this project was to attain a high bar of system stability (95%) in our release/daily environments by getting ahead of problems with proactive monitoring, rather than reacting to complaints from developers whose deployments were failing. That meant building a more complete view of the full change set landing in these environments at any given time, so that when something broke, we could correlate it against exactly what changed instead of guessing.

Part of the output was a reporting dashboard giving visibility into deployment metrics for these environments over time — trends in failure rate, time-to-recovery, and which kinds of changes were most likely to cause instability. Once that visibility existed, we were able to catch and resolve issues before they required a developer to stop and open a ticket, which was the real point: reducing the tax that environment instability was putting on everyone else's velocity.
