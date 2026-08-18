---
title: 'Running an Annual Disaster Recovery Exercise for a Compliance-Driven Customer'
date: '2024-12-17T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - devops
    - disaster-recovery
    - compliance
---

Some customers — particularly in regulated industries like financial services — require documented, periodic proof that your disaster recovery plan actually works, not just that it exists on paper. This project was one of our recurring annual DR exercises to satisfy exactly that kind of requirement for an enterprise customer.

The exercise itself follows a defined pattern: copy a representative dataset into an isolated recovery environment, fail the environment over to our designated DR site, and have the customer (or a customer-facing team) run a smoke test to validate that critical functionality is available post-failover. Coordinating with the customer on what data could be used for the test (production-equivalent vs. general test data) and hitting their required testing window were as much a part of the project as the technical failover itself.

Running this drill annually, rather than only when a real disaster forces the issue, is what actually keeps a DR plan credible instead of theoretical.
