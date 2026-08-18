---
title: 'Emergency Patching of Nginx VM Scale Sets and Kubernetes Nodes for a Critical CVE'
date: '2026-05-14T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - security
    - nginx
    - kubernetes
    - azure
    - cve
---

A CVE affecting the Linux copy_file_range (referred to here by its nickname, "copy.fail") required an emergency, coordinated patching effort across both our Nginx VM scale sets and Linux node pools in our Kubernetes clusters — since AKS Linux nodes and our Nginx VMSS infrastructure were both in the affected blast radius (Windows nodes were unaffected).

The scope was meaningful: multiple Nginx virtual machine scale sets and multiple AKS clusters spanning production, release-candidate, test, and lab environments. Production resources carried the highest bar for care — they required a formally approved change request and had to be patched outside business hours to minimize any risk of customer impact from the maintenance window itself.

Coordinating a security patch across that many environments with different change-control requirements (lab and test can move fast; production needs a change request and an off-hours window) is as much a project management exercise as a technical one. Having a clear map of exactly which environments were affected and what change process each one required going in made it possible to move quickly on the environments that could move fast, while giving production resources the deliberate care they needed.
