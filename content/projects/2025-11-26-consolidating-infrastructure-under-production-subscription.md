---
title: 'Consolidating a Platform''s Infrastructure Under a Single Production Subscription'
date: '2025-11-26T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - azure
    - governance
    - cost-optimization
---

Infrastructure that grows organically over time tends to end up scattered across subscriptions in ways that made sense at the time but create real operational cost later — inconsistent governance, harder-to-track spend, and no single place to reason about the platform's full footprint.

This project consolidated critical infrastructure for one of our platforms — clusters, databases, networking, and supporting services — into a single, designated production Azure subscription. The goals were pretty concrete: better operational visibility, consistent enforcement of security and governance policies across resources that used to live in different administrative boundaries, reduced cost overhead from fragmented environments, and a cleaner foundation to scale from going forward.

The "single pane of glass" framing is a bit of a cliché in infrastructure work, but it's genuinely what this delivered — before this, understanding the platform's full footprint meant checking multiple subscriptions with different policies applied; after, it's one subscription with one consistent set of guardrails.
