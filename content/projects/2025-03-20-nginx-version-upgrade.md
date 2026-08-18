---
title: 'Upgrading Nginx Across the Environment'
date: '2025-03-20T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - nginx
    - azure
    - security
---

A version upgrade for Nginx deployments across our environment — one of the steady drumbeat of "stay current on your dependencies" projects that don't make headlines but keep you off of end-of-life versions and ahead of the CVEs that inevitably target unpatched software.

One wrinkle worth calling out: Nginx has gone through licensing changes over the past few years for some of its distributions and modules, so part of this project involved getting clarity on which license terms applied to the versions and modules we were running before rolling the upgrade out broadly. It's a good reminder that "just upgrade the version" projects sometimes carry licensing or compliance homework alongside the purely technical work.
