---
title: 'Migrating a Legacy Windows API Service into Kubernetes'
date: '2025-11-26T09:00:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - Projects
tags:
    - kubernetes
    - azure
    - migration
    - windows-containers
---

Legacy ASP.NET Framework API service running in IIS on Windows VMs. Need to move it to Kubernetes for better scaling and cost efficiency.

The catch: this isn't a modern cloud-native app that containerizes trivially. It's full-framework, IIS-hosted. Containerized it as a Windows container with self-hosted OWIN instead of keeping IIS in the container - smaller footprint, less dependencies.

Windows Kubernetes migrations are different from Linux/.NET Core ones. Different tooling, larger images, longer startup times, Windows node pools. Don't assume Linux Kubernetes knowledge transfers - Windows containers are a different ecosystem.
