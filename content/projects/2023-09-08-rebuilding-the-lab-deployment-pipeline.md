---
title: 'Rebuilding a Lab Environment Deployment Pipeline From Scratch'
date: '2023-09-08T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - devops
    - ci-cd
    - automation
---

Lab and test environments have a tendency to accumulate complexity over successive iterations of "just add one more special case." By the millionth version of our lab deployment pipeline, it had grown into something that was hard to reason about and expensive to maintain - lots of administrative overhead just to keep it running, let alone extend it. Deploying the pipeline also took far too much time.

This project was a ground-up rebuild of that pipeline with the explicit goal of removing accumulated complexity and reducing the administrative burden of maintaining lab environments. Rather than patch the existing pipeline again, I rebuilt it with a cleaner, more streamlined deployment process - fewer special cases, more consistent conventions, and less manual intervention required to stand up or tear down a lab environment. The overall deployment time went from 45 minutes to less than 25 minutes. 
