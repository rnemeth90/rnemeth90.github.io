---
title: 'HTB - Web Application Fuzzing Module - Value Fuzzing'
date: '2025-12-17T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Web Application Fuzzing - Value Fuzzing

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This post covers value fuzzing, which involves testing different values for a known parameter to find the correct input that returns the desired result (such as a flag).

## Overview

After fuzzing a working parameter, we now have to fuzz the correct value that would return the flag content we need. This section will discuss fuzzing for parameter values, which should be fairly similar to fuzzing for parameters, once we develop our wordlist.

## Custom Wordlist

When it comes to fuzzing parameter values, we may not always find a pre-made wordlist that would work for us, as each parameter would expect a certain type of value.

For some parameters, like usernames, we can find a pre-made wordlist for potential usernames, or we may create our own based on users that may potentially be using the website. For such cases, we can look for various wordlists under the seclists directory and try to find one that may contain values matching the parameter we are targeting.

In other cases, like custom parameters, we may have to develop our own wordlist. For example, if we're fuzzing an `id` parameter, we can guess that it can accept a number input of some sort. These ids can be in a custom format, or can be sequential, like from 1-1000 or 1-1000000, and so on.

## Creating a Number Wordlist

The simplest way to create a wordlist containing numbers from 1-1000 is to use the following command in Bash:

```bash
seq 1 1000 > ids.txt
```

This writes all numbers from 1–1000 to a file called `ids.txt`. Now we can move on to fuzzing for values.

## Value Fuzzing

Our command should be fairly similar to the POST command we used to fuzz for parameters, but our `FUZZ` keyword should be put where the parameter value would be, and we will use the `ids.txt` wordlist we just created:

```bash
ffuf -w ids.txt:FUZZ -u http://admin.academy.htb:PORT/admin/admin.php -X POST -d 'id=FUZZ' -H 'Content-Type: application/x-www-form-urlencoded' -fs xxx
```

We see that we get a hit right away. We can finally send another POST request using `curl`, use the `id` value we just found, and collect the flag:

```bash
curl -X POST http://admin.academy.htb:PORT/admin/admin.php -d 'id=**' -H 'Content-Type: application/x-www-form-urlencoded'
```

The response contains the flag: `HTB{*********************}`.

## Summary

The process for parameter and value fuzzing typically follows these steps:

1. Create or select an appropriate wordlist for the parameter values
2. Perform a fuzzing scan using `ffuf` to identify the accepted value for the parameter
3. Use the discovered value in a request (GET or POST) to retrieve the flag

This technique is essential for discovering hidden functionality and finding the correct inputs needed to access protected resources or retrieve flags in penetration testing scenarios.
