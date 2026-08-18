---
title: 'Replacing an Unreliable Log Shipping Pipeline in Kubernetes'
date: '2025-06-18T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - observability
    - logging
---

We were using Fluent Bit to ship ingress logs out of Kubernetes. Found out it had a known upstream bug that silently dropped log entries in transit - and it wasn't getting fixed upstream, so we couldn't just wait for a patch.

The problem with silent log drops is you don't notice them until the middle of an incident when you go looking for a specific log entry and it's just... gone. So the priority was finding something more reliable. A logging pipeline that silently loses data is worse than having no pipeline at all - at least you know no pipeline won't give you false confidence.

We replaced it with something that actually keeps the logs.
