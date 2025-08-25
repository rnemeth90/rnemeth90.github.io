---
id: 193
title: 'Script for Querying All AD Computers Time Source'
date: '2015-09-01T21:05:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - ActiveDirectory
    - Scripts
    - Tools
    - WindowsServer
---

This script will iterate through all computers in Active Directory and return the configured time server for each computer.

~~~Powershell
<#
    .SYNOPSIS
     Get time source for all computers in domain
    .EXAMPLE
     Get-TimeSource
    .NOTES
     Author: Ryan Nemeth - RyanNemeth@live.com
     Site: http://www.geekyryan.com
    .LINK
     http://www.geekyryan.com
    .DESCRIPTION
     This function will iterate through all computers/servers in a domain and return the time source
     for each.
#>

Write-Host -foregroundcolor Red -BackgroundColor black "This script must be run on a domain controller and requires that the AD Powershell module be installed"

$module = Get-Module -ListAvailable | Select-Object -ExpandProperty Name

if($module -notcontains "ActiveDirectory") {
    Write-Host -foregroundcolor red -backgroundcolor black "***Active Directory Powershell Module Not Found***"
}
else {
    Write-Host -foregroundcolor yellow "Found Active Directory Powershell Module. Importing..."
}

Import-Module ActiveDirectory

$computers = get-adcomputer -filter * | Select-Object -ExpandProperty Name

foreach($computer in $computers) {
  $tm_source = w32tm /query /computer:$computer /source
  write-host "The time source for" $computer "is" $tm_source
}
~~~

![](https://github.com/rnemeth90/PowerShell/blob/master/NTP/Get-TimeSource.ps1)
