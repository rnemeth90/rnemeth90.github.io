---
title: 'Migrating a Legacy Windows API Service into Kubernetes'
date: '2025-11-26T09:00:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - Projects
tags:
    - kubernetes
    - azure
    - migration
    - windows-containers
---

Cost and scalability were the two drivers behind this project: an internal API service was running as a classic ASP.NET Framework application hosted in IIS on Windows VMs, and we wanted to move it into Kubernetes so it could scale to demand more efficiently and cost less to operate.

The tricky part of a migration like this is that you're not dealing with a modern, cloud-native .NET application that containerizes trivially — this was a full-framework, IIS-hosted app. The path we took was to containerize it as a Windows container, favoring a self-hosted execution model (OWIN) over trying to keep IIS itself running inside the container, which reduces the container's footprint and dependency surface.

Migrating legacy Windows Framework applications into Kubernetes is a fundamentally different exercise than migrating a modern .NET Core service — the tooling, the container images, and the operational patterns (Windows node pools, larger image sizes, longer container start times) are all different from the Linux/.NET Core world. If you're facing a similar migration, budget real time for learning the Windows container ecosystem specifically rather than assuming your Linux Kubernetes experience transfers directly.
