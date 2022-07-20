---
id: 216
title: 'Unlock a Domain User from CMD Line'
date: '2014-12-08T02:11:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - ActiveDirectory
    - WindowsServer
---

To unlock a domain user from the command line, use this command:

~~~shell
net user &lt;username&gt; /domain /active:yes
~~~

This can also be done using Powershell:

~~~Powershell
Unlock-ADAccount -identity “CN=John,OU=myUsers,DC=myDomain,DC=local”
~~~