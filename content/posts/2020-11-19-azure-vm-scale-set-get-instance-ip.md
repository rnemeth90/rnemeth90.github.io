---
id: 53
title: 'Azure VM Scale Set &#8211; Get Instance IP Address'
date: '2020-11-19T18:07:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - azure
    - Linux
    - Networking
    - VMSS
---

If you are using VM Scale Sets in Azure, you know how important it can be to quickly obtain an instance IP address. This can of course be done using the Azure Portal. However, I am often working in a shell or VSCode, and I do not want to leave the comfort of my shell to login to the portal.

There are a few options we have for retrieving information about a VMSS and its instances without using the Azure Portal. We can use PowerShell or the Azure CLI. Being that I am constantly flipping between Windows and Linux, I will detail both here.

You will need to have the AZ module installed. To install this module, simple open PowerShell (as admin) and type in “Install-Module -Name az”. To get the IP address of the instances within a scale set, use the following script:

<https://github.com/rnemeth90/Get-VmssInstanceIpAddress>

You can also use the Azure CLI to obtain individual instance IP addresses. This method is much simpler than PowerShell, and only requires one line of code:

~~~shell
az vmss nic list –resource-group myResourceGroup –vmss-name myVmss | grep –w “privateIpAddress”
~~~
