---
title: 'An Analysis of "x-" HTTP Headers and Why We Should Stop Using Them'
author: Ryan
date: '2023-11-01'
layout: post
draft: true
categories:
    - Devops
    - Software Development
tags:
    - Devops
    - Software Development
---

*Disclaimer: This article assumes you have some familiarity with the HTTP protocol in regards to headers.*

If you've worked in web development (or related roles) for any period of time, you have likely come across HTTP headers. Headers are used to transmit metadata about a request or response between a client and server. There are common headers that you have likely seen, such as `host`, `content-type`, and `authorization`, and others that you may be less familiar with. One can also add custom headers, which is a common occurrence. Way back in 1982, the IETF published (RFC-822)[https://datatracker.ietf.org/doc/html/rfc822], which states any custom headers should be prefixed with `x-`. This worked fine for decades. Some of these `x-` headers became very popular and are now considered to be standard (`X-Forwarded-For`, `X-Forwarded-Host`, etc.). More of these can be seen (here)[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers].

As X-prefixed headers gained popularity, the distinction between standard and non-standard headers became blurred. Standardization efforts should ideally remove the X- prefix, but this can lead to backward compatibility issues and break existing implementations. The `x-` headers cannot be used to distinguish between standard and non-standard headers anymore, which was their original intent. Therefore, we should stop using them. If you need to implement custom headers within your code, use a value unique to you. For example, you could prepend the header with your company name (common for application libraries). Example: `com.example.foo.myheader`

