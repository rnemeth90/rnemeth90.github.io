---
id: 96
title: 'Cisco AnyConnect &#8211; VPN Establishment Capability from a Remote Desktop is Disabled'
date: '2020-10-07T13:28:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - Cisco
    - Networking
    - Tools
    - 'Windows Client OS'
---

I ran into this issue this morning when attempting to setup a VPN on a Hyper-V virtual machine. After an hour of searching the Google machine and troubleshooting, I came upon this solution.

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-16.png)](https://lh3.googleusercontent.com/-BYApW8vZjV8/X33B2Or4D7I/AAAAAAAAxuY/hWQwpE-fqo4xInAsx9vyUvzDJXqxe68QQCLcBGAsYHQ/image.png)

Upon installation, AnyConnect pulls down a profile from the ASA containing several settings. This profile is in xml format and is located (on a Windows machine) at %programdata%CiscoCisco AnyConnect Secure Mobility ClientProfileAnyConnectProfile.xsd.

To resolve this issue and connect to your VPN, open this file with notepad (or any text editor, run as admin), search for the “WindowsVPNEstablishment” tag, and modify the value. The default value is “LocalUsersOnly”, you will need to change it to “AllowRemoteUsers”. Save and close the file, then restart the machine.

BEFORE:

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-17.png)](https://lh3.googleusercontent.com/-izGUUyhtWyM/X33Bh8YdqGI/AAAAAAAAxuQ/rBbXsqWhe5wZYoGmjXwyyidGmu1kCNVmgCLcBGAsYHQ/image.png)

AFTER:

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-18.png)](https://lh3.googleusercontent.com/-wFFu1JOXymQ/X33CVp0cImI/AAAAAAAAxug/fibXC6JHmkkilFtWv8641x20flapCibYACLcBGAsYHQ/image.png)