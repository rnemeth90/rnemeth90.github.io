---
title: 'Upgrading Nginx Across the Environment'
date: '2025-03-20T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - nginx
    - azure
    - security
---

Nginx upgrade across the board - one of those quiet maintenance projects that keeps you off end-of-life versions and away from CVEs. Nothing flashy, but necessary.

The interesting part was that Nginx licensing has shifted around over the years for different distributions and modules, so before pushing the upgrade out I had to sort out which license terms applied to what we were running. It's a good reminder that even straightforward upgrade projects sometimes have compliance homework hiding inside them.
