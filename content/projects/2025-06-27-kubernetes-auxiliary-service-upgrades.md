---
title: 'Upgrading the Auxiliary Services That Keep a Kubernetes Platform Running'
date: '2025-06-27T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
    - operations
---

Beyond the core Kubernetes version itself, a real-world cluster runs a whole ecosystem of supporting services — an ingress controller, certificate automation, cost visibility tooling, an OAuth proxy for authentication, a metrics stack, and autoscaling add-ons, among others. All of these need their own version upgrade cadence, and letting them drift is just as risky as letting the cluster's Kubernetes version fall behind.

This project was a coordinated upgrade pass across that whole auxiliary service ecosystem — ingress controller, cert automation, cost-visibility tooling, the metrics/dashboarding stack, event-driven autoscaling, and the authentication proxy sitting in front of ingress. Because these services often have dependencies on each other (the ingress controller and the auth proxy, for instance, or the metrics stack and the autoscaler), the upgrades had to be sequenced and tested carefully rather than done as one big-bang change.

It's easy to think of "the cluster" as just its Kubernetes version, but in practice the health of a platform depends just as much on this whole supporting cast staying current.
