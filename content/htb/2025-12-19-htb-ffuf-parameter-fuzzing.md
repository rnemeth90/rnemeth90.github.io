---
title: 'HTB - Web Application Fuzzing Module - Parameter Fuzzing'
date: '2025-12-19T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Web Application Fuzzing - Parameter Fuzzing

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This post covers parameter fuzzing, which involves identifying which parameters a web application accepts and processes. This is crucial for finding potential vulnerabilities or hidden functionality.

## Overview

Parameter fuzzing is the process of testing various parameter names to see which ones the web application accepts. This can reveal hidden functionality, API endpoints, or potential security vulnerabilities. Once we identify a working parameter, we can then fuzz its values to find the correct input that returns the desired result (like a flag).

## GET Parameter Fuzzing

For GET requests, we can fuzz parameters by placing the `FUZZ` keyword in the URL where the parameter name would be:

```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:PORT/admin/admin.php?FUZZ=test -fs xxx
```

In this example, we're using a wordlist of common parameter names (`burp-parameter-names.txt`) and testing each one by appending `=test` as the value. The `-fs xxx` flag filters out responses with a specific size (you'll need to determine the common size of failed responses first).

## POST Parameter Fuzzing

For POST requests, we need to use the `-X POST` flag and specify the data with `-d`. We also need to set the appropriate Content-Type header:

```bash
ffuf -w /opt/useful/seclists/Discovery/Web-Content/burp-parameter-names.txt:FUZZ -u http://admin.academy.htb:PORT/admin/admin.php -X POST -d 'FUZZ=test' -H 'Content-Type: application/x-www-form-urlencoded' -fs xxx
```

This command will test each parameter name from the wordlist by sending a POST request with `FUZZ=test` as the data.

## Determining Filter Size

Before running the fuzzing command, you need to determine what size to filter. You can do this by:

1. First running the command without the `-fs` flag to see the common response size
2. Or manually sending a request with an invalid parameter and noting the response size
3. Then use that size with `-fs` to filter out the common "invalid parameter" responses

For example, if invalid parameters return a response size of 986 bytes, you would use `-fs 986` to filter those out, leaving only responses with different sizes that indicate a valid parameter.

## Example Output

When you find a valid parameter, `ffuf` will display it:

```
[Status: 200, Size: 1234, Words: 45, Lines: 12]
| URL | http://admin.academy.htb:PORT/admin/admin.php
| FUZZ | id
```

This indicates that the `id` parameter is accepted by the application. Once we identify a working parameter, we can move on to value fuzzing to find the correct value that returns the flag.
