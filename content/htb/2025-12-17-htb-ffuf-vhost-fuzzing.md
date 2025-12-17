---
title: 'HTB - Web Application Fuzzing Module - VHost Fuzzing'
date: '2025-12-17T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Web Application Fuzzing - VHost Fuzzing

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This post covers VHost fuzzing, which allows us to identify sub-domains that do not have public DNS records or sub-domains under websites that are not public.

## Overview

As we saw in the previous section, we were able to fuzz public sub-domains using public DNS records. However, when it came to fuzzing sub-domains that do not have a public DNS record or sub-domains under websites that are not public, we could not use the same method. This is where VHost fuzzing comes in.

## VHosts vs. Sub-domains

The key difference between VHosts and sub-domains is that a VHost is basically a 'sub-domain' served on the same server and has the same IP, such that a single IP could be serving two or more different websites.

VHosts may or may not have public DNS records. In many cases, many websites would actually have sub-domains that are not public and will not publish them in public DNS records, and hence if we visit them in a browser, we would fail to connect, as the public DNS would not know their IP. Once again, if we use the sub-domain fuzzing, we would only be able to identify public sub-domains but will not identify any sub-domains that are not public.

This is where we utilize VHosts Fuzzing on an IP we already have. We will run a scan and test for scans on the same IP, and then we will be able to identify both public and non-public sub-domains and VHosts.

## VHosts Fuzzing

To scan for VHosts, without manually adding the entire wordlist to our `/etc/hosts`, we will be fuzzing HTTP headers, specifically the `Host:` header. To do that, we can use the `-H` flag to specify a header and will use the `FUZZ` keyword within it:

```bash
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u http://academy.htb:PORT/ -H 'Host: FUZZ.academy.htb'
```

We see that all words in the wordlist are returning 200 OK! This is expected, as we are simply changing the header while visiting `http://academy.htb:PORT/`. So, we know that we will always get 200 OK. However, if the VHost does exist and we send a correct one in the header, we should get a different response size, as in that case, we would be getting the page from that VHosts, which is likely to show a different page.

## Filtering Results

So far, we have not been using any filtering to our `ffuf`, and the results are automatically filtered by default by their HTTP code, which filters out code 404 NOT FOUND, and keeps the rest. However, as we saw in our previous run of `ffuf`, we can get many responses with code 200. So, in this case, we will have to filter the results based on another factor.

Ffuf provides the option to match or filter out a specific HTTP code, response size, or amount of words. We can see that with `ffuf -h`.

In this case, we cannot use matching, as we don't know what the response size from other VHosts would be. We know the response size of the incorrect results, which, as seen from the test above, is 900, and we can filter it out with `-fs 900`. Now, let's repeat the same previous command, add the above flag:

```bash
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u http://academy.htb:PORT/ -H 'Host: FUZZ.academy.htb' -fs 900
```

This will filter out all responses with a size of 900 bytes, leaving only responses with different sizes, which indicate valid VHosts.

We can verify that by visiting the page and seeing if we can connect to it. We see that we can access the page, but we get an empty page, unlike what we got with `academy.htb`, therefore confirming this is indeed a different VHost. We can even visit `https://admin.academy.htb:PORT/blog/index.php`, and we will see that we would get a 404 PAGE NOT FOUND, confirming that we are now indeed on a different VHost.

Try running a recursive scan on `admin.academy.htb`, and see what pages you can identify.
