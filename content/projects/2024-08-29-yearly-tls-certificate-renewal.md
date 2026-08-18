---
title: 'Annual TLS Certificate Renewal Across Customer-Facing Endpoints'
date: '2024-08-29T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - security
    - tls
    - operations
---

A recurring, unglamorous but critical piece of yearly operations: renewing TLS certificates before they expire. An expired certificate is one of the more embarrassing (and entirely preventable) ways to cause a customer-facing outage, so this is a task that gets treated with real process discipline rather than being left to whoever notices the calendar.

This cycle covered certificates across several different termination points — public-facing NGINX endpoints for customer communication, IIS-hosted services, and a few Terraform-templated configurations where certificate references are hard-coded and need explicit updates rather than just a drop-in swap. Each location has its own quirks for how the new certificate gets deployed and validated, so part of the yearly exercise is maintaining an accurate inventory of every location a cert lives, not just the well-known ones.

Nothing about this is technically hard, but it's exactly the kind of task where a checklist and a documented inventory prevent a genuinely bad day.
