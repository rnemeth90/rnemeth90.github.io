---
title: 'Integer Overflow'
date: '2025-12-08T16:01:00+00:00'
author: Ryan
layout: post
categories:
- TIL
---

Consider an 8-bit system. What happens when you add `1` to the maximum value of `255` (`11111111` in binary)? An integer overflow occurs. The 8 bit result becomes `00000000` because only 8 bits are kept.

```
11111111
+00000001
---------
1 00000000   < 9th bit carry-out
```

The carry bit is then set in the CPUs eflags register, indicating that an overflow has occurred. Decisions can then be made by the CPU based on this flag.


The remainder can be calculated as follows on an 8 bit system:

`(a + b) mod 256`

On a 16-bit system:

`(a + b) mod 2^16`

and so on...

