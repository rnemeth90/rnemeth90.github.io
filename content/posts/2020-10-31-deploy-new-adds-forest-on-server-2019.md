---
id: 86
title: 'Deploy a New ADDS Forest on Server 2019 Core'
date: '2020-10-31T01:02:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - ActiveDirectory
    - WindowsServer
---

Prerequisites:

Change server name and IP address
Configure time settings and NTP

In this post we will be reviewing the basic installation of the Active Directory Domain Services role and setup of a new forest on Windows Server Core 2019.

To get started, login to your server with administrator privileges. You will first need to type in “powershell” in the cmd prompt to start powershell. Once you do that, type in the following command to install the Active Directory Domain Services role:

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-12.png)](https://lh3.googleusercontent.com/-LnSTbXjG2Hc/X5y3R3F-eWI/AAAAAAAAx2A/lWQBpA44Dmo-Jpbck2iPmgibU6z0DM1YwCLcBGAsYHQ/image.png)

After installing the role, we’ll continue by creating a new ADDS Forest and promoting this server to the primary domain controller.

First, we’ll need to gather a password. This password will not be used for a domain user account. The local administrator on this server will become the domain administrator account for the domain. The password we’re gathering in the next step will be used for Directory Services Restore Mode (DSRM). DSRM is a recovery mode used to recover domain controllers that won’t boot up. We technically only need a password, not a username for this account.

Type in the following:
~~~Powershell
$cred = Get-Credential
~~~
In the username field for the credentials prompt below, just type in anything you want, as the value will not be used. This prompt will store our username/password in a variable object. We can then access the password within the credential object by typing:
~~~Powershell
$cred.password
~~~

We can see that this password is stored as a secure string object. Let’s continue on with the Directory Services installation.

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-13.png)](https://lh3.googleusercontent.com/-n-W0yvwr2Zs/X5y3X64NjZI/AAAAAAAAx2E/rx5urA7p_NMl3peX5g0J7Ax7biWwNADAgCLcBGAsYHQ/image.png)

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-14.png)](https://lh3.googleusercontent.com/-0k-aZrMhyGw/X5y3ckH10pI/AAAAAAAAx2I/FS56uvXCirAaBHKwWmIRQ4xIGU_jp_GFwCLcBGAsYHQ/image.png)

Once we have our credential variable, we can install a new forest and domain controller using the command below. Let us break down what this cmd is doing:

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-15.png)](https://lh3.googleusercontent.com/-OF_HVfCPZIM/X5y3ijEA5YI/AAAAAAAAx2M/0vMV3CJczT8D3q5x8hzPAZVSL5DycplBACLcBGAsYHQ/image.png)

Install-ADDSForest: The powershell cmdlet to create a new forest and domain controller

-DomainName: The domain name to be used for the forest

-DomainNetBiosName: The domain “Short name” to be used for the forest. This is the value used when you type in a username in the domainusername format. Example “myDomainbgates”.

-SafeModeAdministratorPassword: The value we captured in our credential prompt above. This is used for Directory Services Restore Mode. This mode can be accessed by pressing F8 while the server is booting. It is commonly used for recovering a failed domain controller.

-DatabasePath: The path for the Active Directory database. It’s a best practice to put this database on its own disk.

-LogPath: The directory for ADDS log files

-DomainMode: The domain functional level. The domain functional level specifies the attributes and capabilities available to objects within the domain. The higher the level you choose, the more features will be available to you.

-ForestMode: The forest functional level. Similar to the domain functional level but applies to the entire forest.

-InstallDNS: Install the DNS role alongside the ADDS role.

-WhatIf: This is a powershell “thing”. Most cmdlets have the “whatif” parameter. It basically allows you to run the cmdlet in “test” mode without actually making any changes to your environment. Once you’re happy with the output, you can remove the “whatif” parameter and run the command to install ADDS and promote this server to a domain controller.