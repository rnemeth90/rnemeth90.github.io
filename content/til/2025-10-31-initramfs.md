---
title: 'Linux initramfs'
date: '2025-10-31T16:01:00+00:00'
author: Ryan
layout: post
categories:
- TIL
---

The initramfs (initial RAM filesystem) is a temporary in-memory filesystem used for systems that do not know in advance certain things about their hardware at boot time. It is used to bootstrap the real root filesystem and provide necessary drivers and tools to mount it.

Some examples of when an initramfs is needed include:
- Systems that use encrypted root filesystems, where the initramfs contains the tools to prompt for a decryption key.
- Systems that boot from network filesystems, where the initramfs contains the necessary network drivers
- Systems that use complex storage setups like LVM or RAID, where the initramfs contains the tools to assemble these setups before mounting the root filesystem.
- Systems that require specific drivers for storage devices that are not built into the kernel, where the initramfs contains these drivers.
- Systems that need to perform specific setup tasks before mounting the root filesystem, such as checking filesystem integrity or loading firmware.
- Systems that boot from removable media, where the initramfs contains the necessary drivers to access the media.
- Systems that need to support multiple root filesystem types, where the initramfs contains the necessary tools to handle these types.
