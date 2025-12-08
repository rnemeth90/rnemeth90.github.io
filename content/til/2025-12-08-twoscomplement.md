---
title: '2s Complement'
date: '2025-12-08T16:01:00+00:00'
author: Ryan
layout: post
categories:
- TIL
---

Two's Complement is required for representing signed integers. If the high bit is 1 (i.e. if the binary number is 128 or greater in an 8-bit system), then the number is negative. To find the negative value, invert all bits and add 1.

Example:

To convert the binary number `11111010` to decimal:

First, invert all the bits: `00000101`

Then, add 1: `00000101 + 1 = 00000110`

Finally, convert to decimal: `6`

