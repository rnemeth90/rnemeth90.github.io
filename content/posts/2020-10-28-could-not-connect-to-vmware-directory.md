---
id: 91
title: 'Could not connect to VMware Directory Service via LDAP when Deploying New vCenter Appliance'
date: '2020-10-28T13:51:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - vmware
---

Problem:

Deploying a brand new vCSA 6.7 appliance results in the following error during the second stage of the deployment.

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h29_02.png)](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h29_02.png)<span style="text-align: left;"> </span>

Solution:

This problem is almost always caused by DNS resolution. Once you create the appropriate A and PTR record for your appliance on a LOCAL DNS server, you should be to successfully complete the deployment. Local DNS resolution is required, you cannot use a public DNS server while installing vCenter. For example, 8.8.8.8 will not work.

Since you have already completed Stage 1 of the deployment, you can login to the appliance via SSH and update the DNS settings. This will only work if you chose to enable SSH during Stage 2 of the deployment.

SSH to the appliance and run “/opt/vmware/share/vami/vami\_config\_net” (without quotes). Choose option 4 to update DNS settings and option 3 to update the hostname (if necessary). The deployment wizard states that a hostname is optional, but it is actually required. I have never had a successful deployment without specifying the hostname.

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h33_18.png)](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h33_18.png)

You can then verify the DNS settings have been updated in the resolve.conf:

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h33_57.png)](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_07h33_57.png)

[![](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_08h47_36.png)](https://rnemeth90.github.io/wp-content/uploads/2020/10/2020-10-28_08h47_36.png)