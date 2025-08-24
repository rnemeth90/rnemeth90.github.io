---
title: 'Linux Containers'
author: Ryan
date: '2024-12-25'
layout: post
draft: true
categories:
  - containers
tags:
  - devops
  - software development
  - containers
  - kubernetes
  - linux
  - sre
---

# NOTES
- Containers in Linux are implemented with various namespaces and cgroups.

# Introduction
If you work in tech, it’s rare to have a day where you don’t think or read about containerization. Docker, Kubernetes, Mesos, OpenShift, containerd, Azure Kubernetes Service, Amazon Elastic Kubernetes Service—the list of terms and platforms sometimes feels endless.

The reality is that nearly every major technology company relies on containers at scale. OpenAI, Google, Amazon, Netflix, and even large portions of Microsoft Azure run their infrastructure on container platforms (most notably Kubernetes). But what exactly is a “container”? We’re often told that a container is just a process running on a host system, wrapped in some clever isolation. That’s true at a very high level, but it misses the nuance. The inner workings of containers rely on powerful, low-level Linux kernel features that go far beyond a simple process.

This post takes a closer look at those features—namespaces, cgroups, filesystem isolation, and more—and shows how they fit together to create what we call a container.

# History
The idea of isolating processes isn’t new. In fact, it dates back to the late 1970s with the introduction of chroot in Unix V7. chroot allowed a process and its children to operate in a different root directory, effectively cutting them off from the rest of the filesystem. It wasn’t full isolation, but it planted the seed for the concept.

Progress was slow for a couple of decades. In the early 2000s, FreeBSD introduced Jails, an advancement over chroot that not only isolated the filesystem but also provided process and network isolation. Around the same time, Solaris developed Zones, tackling the same problem space with a different approach. Both were early attempts at solving multi-tenancy and security challenges in a lightweight way.

In 2006, Google created “Process Containers” as a way to limit, account for, and isolate resource usage (CPU, memory, disk I/O, and network I/O). A year later, this work was renamed Control Groups (cgroups) and merged into Linux 2.6.24, laying the foundation for resource governance in modern containers.

By 2008, Linux had its first true container runtime with LXC (Linux Containers). LXC combined namespaces (for isolation) and cgroups (for resource control) into a coherent framework that felt like lightweight virtual machines. Then came 2013 and the introduction of Docker. Docker initially used LXC as its underlying engine, but later replaced it with libcontainer. What set Docker apart wasn’t the primitives themselves—it was the developer experience. Docker packaged containers with easy tooling, image distribution, and an ecosystem that made containerization accessible to every developer, not just kernel hackers. This marked the beginning of the container revolution we know today.

So where does that leave us today? Modern containers aren’t magic, and they aren’t a new kind of process invented by Docker or Kubernetes. They’re built on existing Linux kernel features—features that, when combined, create the illusion of a completely isolated system. At the core are namespaces, which provide process, network, and filesystem isolation. Alongside namespaces are control groups (cgroups), which handle resource limits and accounting. Layer on top of that capabilities, security modules like seccomp and AppArmor, and filesystem tricks like overlayfs, and you have everything you need to build what we call a container. Let’s start by looking at the first of these building blocks: namespaces.

# Namespaces — explain each with examples (unshare, lsns).
As stated, namespaces provide process, network, and filesystem isolation. But how do they actually work? Let's take a quick look at the man page:

```
λ rnemeth90.github.io (main) $ man namespaces
namespaces(7)                                              Miscellaneous Information Manual                                             namespaces(7)

NAME
       namespaces - overview of Linux namespaces

DESCRIPTION
       A  namespace  wraps a global system resource in an abstraction that makes it appear to the processes within the namespace that they have their
       own isolated instance of the global resource.  Changes to the global resource are visible to other processes that are  members  of  the  name‐
       space, but are invisible to other processes.  One use of namespaces is to implement containers.

       This  page  provides pointers to information on the various namespace types, describes the associated /proc files, and summarizes the APIs for
       working with namespaces.

   Namespace types
       The following table shows the namespace types available on Linux.  The second column of the table shows the flag value that is used to specify
       the namespace type in various APIs.  The third column identifies the manual page that provides details on the namespace type.  The last column
       is a summary of the resources that are isolated by the namespace type.

       Namespace   Flag              Page                    Isolates
       ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
       Cgroup      CLONE_NEWCGROUP   cgroup_namespaces(7)    Cgroup root directory
       IPC         CLONE_NEWIPC      ipc_namespaces(7)       System V IPC, POSIX message queues
       Network     CLONE_NEWNET      network_namespaces(7)   Network devices, stacks, ports, etc.
       Mount       CLONE_NEWNS       mount_namespaces(7)     Mount points
       PID         CLONE_NEWPID      pid_namespaces(7)       Process IDs
       Time        CLONE_NEWTIME     time_namespaces(7)      Boot and monotonic clocks
       User        CLONE_NEWUSER     user_namespaces(7)      User and group IDs
       UTS         CLONE_NEWUTS      uts_namespaces(7)       Hostname and NIS domain name
```

From the description in the man page for namespaces, we can determine a few facts:
1) namespaces abstract a resource so that the processes within the namespace think they have their own isolated instance of the resource
2) multiple processes can belong to a namespace
3) namespaces are used to implement containers
4) There are 8 namespace types (cgroup, IPC, network, mount, pid, time, user, UTS). Each of these is a type of resource that we can isolate by using a namespace.


# cgroups — resource control and accounting, v1 vs v2.

# Filesystem isolation — chroot, mount namespaces, pivot_root, overlayfs.

# Capabilities — fine-grained privilege control.

# Seccomp / AppArmor / SELinux — security beyond isolation.

# Putting it all together — what happens when you docker run.
