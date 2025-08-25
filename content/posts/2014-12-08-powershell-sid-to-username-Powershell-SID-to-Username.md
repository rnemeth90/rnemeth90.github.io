---
id: 213
title: 'Powershell: SID to Username'
date: '2014-12-08T13:43:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - ActiveDirectory
    - Scripts
    - WindowsServer
---

This is a simple script to convert a SID to a username

~~~Powershell
# Returns a username based on a SID
# Author: Ryan Nemeth
# Date: 12/2/2014

$SID = read-host “Please enter the SID: ”
$object = New-Object System.Security.Principal.SecurityIdentifier($SID)
$User = $object.Translate( \[System.Security.Principal.NTAccount\])
write-host “The user is: ” $User.Value
~~~