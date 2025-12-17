---
title: 'HTB - Web Application Fuzzing Module - Sub-domain Fuzzing'
date: '2025-12-17T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Web Application Fuzzing - Sub-domain Fuzzing

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This post covers using `ffuf` to identify sub-domains (i.e., *.website.com) for any website. Sub-domains are websites underlying another domain. For example, https://photos.google.com is the photos sub-domain of google.com.

## Overview

In sub-domain fuzzing, we check different websites to see if they exist by checking if they have a public DNS record that would redirect us to a working server IP. Before we can start our scan, we need two things:

1. A wordlist
2. A target

Luckily for us, in the SecLists repo, there is a specific section for sub-domain wordlists, consisting of common words usually used for sub-domains. We can find it in `/opt/useful/seclists/Discovery/DNS/`. In our case, we would be using a shorter wordlist, which is `subdomains-top1million-5000.txt`. If we want to extend our scan, we can pick a larger list.

## DNS Records and /etc/hosts

Before diving into sub-domain fuzzing, it's important to understand how DNS and browsers work:

- Browsers map URLs to IP addresses to access websites
- If a URL isn't in the local `/etc/hosts` file or a public DNS (like Google's 8.8.8.8), the browser cannot connect to the website
- Websites like `academy.htb` are local to the Hack The Box (HTB) environment and not publicly accessible via standard DNS servers
- To access local websites, browsers need to associate the URL with its server IP by adding a mapping in the local `/etc/hosts` file:

```bash
sudo sh -c 'echo "SERVER_IP academy.htb" >> /etc/hosts'
```

Once mapped, the browser can resolve `academy.htb` to its corresponding IP. After mapping, accessing `http://academy.htb:PORT` confirms it connects to the same server as the direct IP.

## Sub-domain Fuzzing

Let's use `ffuf` and place the `FUZZ` keyword in the place of sub-domains. For a public target like `inlanefreight.com`, we can run:

```bash
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u https://FUZZ.inlanefreight.com/
```

This command will test each word in the wordlist as a potential sub-domain. When we run this, we should see several hits for valid sub-domains.

However, when we try the same thing on `academy.htb`:

```bash
ffuf -w /opt/useful/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -u http://FUZZ.academy.htb/
```

We see that we do not get any hits back. Does this mean that there are no sub-domains under `academy.htb`? No.

This means that there are no public sub-domains under `academy.htb`, as it does not have a public DNS record. Even though we added `academy.htb` to our `/etc/hosts` file, we only added the main domain, so when `ffuf` is looking for other sub-domains, it will not find them in `/etc/hosts`, and will ask the public DNS, which obviously will not have them.

For local or non-public domains, we need to use VHost fuzzing instead, which we'll cover in the next article.
