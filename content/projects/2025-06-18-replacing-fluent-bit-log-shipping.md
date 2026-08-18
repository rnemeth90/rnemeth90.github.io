---
title: 'Replacing an Unreliable Log Shipping Pipeline in Kubernetes'
date: '2025-06-18T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - kubernetes
    - observability
    - logging
---

We were running Fluent Bit in our Kubernetes clusters to ship ingress controller logs off to our log analytics platform. Over time, we identified a known upstream bug that caused some log entries to be silently dropped in transit — and it wasn't a bug that was actively being fixed upstream, which meant we couldn't just wait it out.

This project was about finding and implementing a more reliable alternative for offloading those ingress logs. Silent log drops are an especially nasty class of problem because you don't find out about them until you go looking for a specific log entry during an incident and it simply isn't there — so reliability of the pipeline itself, not just its throughput, was the main evaluation criterion for whatever replaced it.

The lesson that stuck with me from this one: when a known bug in a piece of your observability pipeline isn't going to get fixed upstream, don't let "we mostly still get logs" be good enough — a logging pipeline that silently loses data is arguably worse than no pipeline at all, because it gives you false confidence.
