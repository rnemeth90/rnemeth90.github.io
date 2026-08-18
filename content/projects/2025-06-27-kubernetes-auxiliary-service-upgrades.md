---
title: 'Upgrading the Auxiliary Services That Keep a Kubernetes Platform Running'
date: '2025-06-27T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - aks
    - azure
    - operations
---

Running a Kubernetes cluster means managing a whole ecosystem of supporting services - ingress controller, cert automation, cost visibility tooling, authentication proxy, metrics stack, autoscaling add-ons. They all need upgrades on their own cadence, and letting them rot is just as risky as letting Kubernetes itself fall behind.

This was a coordinated upgrade pass through that whole ecosystem - ingress, certs, autoscaling, auth proxy, the metrics and dashboarding stack. These services depend on each other (ingress and the auth proxy, metrics and autoscaler, etc.), so the upgrades had to be sequenced and tested carefully, not just done all at once.

People think of "the cluster" as just the Kubernetes version, but platform health depends just as much on all this supporting infrastructure staying current.
