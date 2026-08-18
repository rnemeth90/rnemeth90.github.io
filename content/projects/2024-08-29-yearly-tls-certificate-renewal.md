---
title: 'Annual TLS Certificate Renewal Across Customer-Facing Endpoints'
date: '2024-08-29T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - security
    - tls
    - operations
---

Every year: renew the TLS certificates before they expire. It's not glamorous, but it's one of the more embarrassing ways to take down a customer-facing service if you slip up on it.

This round meant hitting certificates in multiple places - NGINX endpoints, IIS services, and some Terraform configs where certs are hard-coded and need manual updates instead of just dropping in a new one. Each has its own deployment quirks, so the real discipline is keeping an accurate inventory of everywhere a cert lives, not just the obvious spots.

None of the technical work is hard. It's the kind of task where a proper checklist and inventory keep you from having a genuinely bad day.
