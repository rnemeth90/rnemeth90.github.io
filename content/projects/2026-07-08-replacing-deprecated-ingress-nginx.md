---
title: 'Migrating Off Ingress NGINX Ahead of Its Retirement'
date: '2026-07-08T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - networking
    - gateway-api
---

Ingress NGINX is being retired. Best-effort support until March 2026, then nothing. Need to migrate everything before then.

Structured approach:
1. Inventory - every cluster, every Ingress resource, every controller config and Helm release.
2. Assess options - Gateway API, Azure AppGW Ingress Controller, Traefik, Kong, HAProxy, NGINX Gateway Fabric, Blixt.
3. Select based on maintainability, security, performance, Azure integration, roadmap stability - not just popularity.
4. Migrate across all clusters.

Upstream retirements are a forcing function to revisit if the original choice is still right. Instead of a like-for-like replacement, this was a real opportunity to evaluate the Gateway API ecosystem that's matured a lot since we first picked ingress-nginx.
