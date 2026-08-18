---
title: 'Migrating Off Ingress NGINX Ahead of Its Retirement'
date: '2026-07-08T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - networking
    - gateway-api
---

The Kubernetes SIG Network and SIG Release teams announced the retirement of the widely-used Ingress NGINX controller — best-effort support only until March 2026, with no further releases or security fixes after that. Given how central ingress is to a Kubernetes platform's security posture, waiting until the last minute to react wasn't an option.

This project ran through a structured migration process:

1. **Inventory** — enumerate every AKS cluster and every Ingress resource referencing ingress-nginx, including class annotations, controller configuration, and Helm releases, to understand the full scope of what needed to move.
2. **Assess options** — evaluate the realistic replacement candidates, including the Kubernetes-native Gateway API, Azure's Application Gateway Ingress Controller, and several third-party ingress/gateway controllers (Traefik, Kong, HAProxy, NGINX Gateway Fabric, and Blixt among them).
3. **Select a target** — weigh each option against maintainability, security posture, performance, how well it integrates with Azure, and how stable its own roadmap looked, rather than just picking the most popular option.
4. **Plan and execute the migration** across all affected clusters.

Migrations driven by an upstream project's retirement announcement are a good forcing function for revisiting whether your original choice is still the right one — rather than doing a like-for-like replacement, this was a real opportunity to evaluate the broader Gateway API ecosystem that's matured significantly since we first adopted ingress-nginx.
