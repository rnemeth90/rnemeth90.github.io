---
title: 'Running the 2025 Annual Disaster Recovery Exercise'
date: '2025-12-11T09:00:00+00:00'
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

This year's iteration of our recurring, compliance-driven disaster recovery exercise for an enterprise customer with strict testing requirements (including SOC 2 obligations). As with the prior year's exercise, the drill involved copying representative environment data into an isolated environment, failing that environment over to our DR site, and having the QA team run a full smoke test against the failed-over environment to validate critical functionality.

Running this same exercise for a second consecutive year gave us a chance to compare notes against the previous run — what took longer than expected last time, what documentation was stale, where the runbook needed updates. Each iteration of an annual DR exercise should make the next one faster and more confident; if it doesn't, the exercise isn't actually improving your real-world recovery posture, it's just checking a compliance box.
