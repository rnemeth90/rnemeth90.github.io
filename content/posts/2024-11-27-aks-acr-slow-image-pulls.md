---
title: 'Mitigating Slow Container Image Pulls on Azure Kubernetes Service (AKS)'
author: Ryan
date: '2024-11-27'
layout: post
draft: true
categories:
  - Kubernetes
  - Azure
tags:
  - devops
  - web development
  - azure container registry
  - azure kubernetes service
  - acr
  - aks
  - kubernetes
  - containers
  - docker
  - software development
---

# Introduction

A while back, I encountered an issue that left me scratching my head: deployments to our Azure Kubernetes Service (AKS) cluster were painfully slow. What should have been a quick scale-up turned into a waiting game. Naturally, my first thought was the Azure Container Registry (ACR)—it’s easy to assume that’s the bottleneck when pulling images slows down. But after digging deeper, the problem wasn’t as straightforward as I’d hoped.

To rule out ACR, I investigated its configuration. Even with geo-replication disabled, image pulls from an ACR in Europe to AKS nodes in Australia were surprisingly fast. That led me to look at the SKUs. The Basic and Standard SKUs have lower limits for read and write operations compared to Premium, which could be a factor under heavy load. You can check the specifics [here](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-skus#service-tier-features-and-limits). Still, ACR performance held up during testing. Following the [ACR troubleshooting guide](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-troubleshoot-performance) confirmed it wasn’t the bottleneck.

With ACR eliminated, I began exploring other possibilities, and one stood out immediately: the network.

---

### Could It Be the Network?

Whenever you’re dealing with distributed systems, the network is always a suspect. In this case, the cluster’s network configuration was worth examining, especially since pulling images involves a lot of data transfer.

#### Things I Checked:

1. **Latency and Bandwidth**:

   - Image pulls from ACR to AKS nodes rely heavily on the available bandwidth between your cluster and the registry.
   - Using Azure Monitor, I looked for any signs of high latency or packet loss that could indicate a problem with the virtual network.

2. **Virtual Network Configuration**:

   - For AKS, the choice between basic and advanced networking (using Azure CNI) can impact performance. Advanced networking provides a dedicated IP per pod, which can reduce bottlenecks in high-load scenarios.
   - Misconfigured network security groups (NSGs) or firewalls can also introduce delays.

3. **Azure ExpressRoute or VPN Gateway**:
   - If you’re pulling images from a private ACR over ExpressRoute or a VPN gateway, throughput limitations on those connections can become a bottleneck.

In my case, the network didn’t seem to be the root cause either. But this step reinforced the importance of not overlooking it when troubleshooting.

---

### The Real Culprit: Node Disk Performance

With ACR and the network ruled out, I turned my attention to the AKS nodes. Scaling a deployment from 2 to 50 replicas caused a noticeable slowdown. Each replica needed to pull its container image, putting significant strain on the nodes’ OS disks.

For instance:

- A **D4s_v3 VM** with a 128 GB **persistent OS disk** offers **500 IOPS** and **96 MB/sec throughput**.
- The same VM with an **ephemeral OS disk** provides **8000 IOPS** but only **64 MB/sec throughput**.

The performance gap between ephemeral and persistent disks explained why persistent disks were struggling to keep up with the demand during scaling operations.

---

### Diagnosing the Disk Bottleneck

To confirm the OS disk as the issue, I reviewed the **OS Disk Queue Depth** metric in the Virtual Machine Scale Set (VMSS) metrics for the AKS node pool. This metric measures the number of outstanding I/O requests waiting to be processed.

- **What I Found**:
  - During normal operations, the queue depth hovered between **10 and 17**, which was manageable.
  - However, during cluster upgrades and scale-outs, it spiked above **20**, signaling that the disk couldn’t handle the workload.

To analyze these metrics:

1. Navigate to the AKS node pool’s VMSS in the Azure portal.
2. Review the **Disk I/O Throughput** and **Queue Depth** metrics.
3. Compare the IOPS and throughput limits of your OS disks with the observed metrics.

---

### Mitigation: Network, Disks, and Image Pull Policies

Resolving the issue required addressing multiple factors:

1. **Optimize Network Configuration**:

   - Ensure sufficient bandwidth and low latency between ACR and the AKS nodes.
   - If possible, deploy ACR in the same region as the AKS cluster to minimize network latency.
   - Consider upgrading to advanced networking for more efficient pod-to-registry communication.

2. **Upgrade Node Disk Performance**:

   - Increase the size of persistent OS disks or switch to ephemeral disks for better IOPS and throughput.
   - Monitor the **OS Disk Queue Depth** and act if it consistently exceeds 20 during normal operations.

3. **Adjust Kubernetes Image Pull Policies**:
   - Changing the `imagePullPolicy` to `IfNotPresent` reduced unnecessary pulls of already cached container images, lowering the load on both the network and disks.

---

### A Final Thought

Troubleshooting slow container image pulls can feel like chasing shadows. In my case, it turned into a crash course on the interplay between ACR, networking, and node disk performance. While the disk was ultimately the bottleneck, taking a closer look at the network reaffirmed the importance of holistic troubleshooting.

If you’re facing a similar issue, don’t overlook any part of your infrastructure. Investigating every layer—from registry to network to nodes—not only helps identify the problem but also deepens your understanding of how your system operates. And that’s always worth the effort.
