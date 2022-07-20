---
id: 103
title: 'Azure Site Recovery &#8211; VMware-to-Azure: Wrong IP address discovered for VM'
date: '2018-08-21T17:26:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - azure
    - vmware
---

When replicating virtual machines from VMware to Azure using Site Recovery, you may encounter an issue where the Configuration server discovers the wrong IP address for a VM. This can be caused by stale entries within the infrastructurevms MySQL table that is used by ASR to track VM attributes.

To resolve this issue, you first need to disable replication for the VM in the Azure Portal.

[![](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-21_13h20_26.png)](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-21_13h20_26.png)

Next, login to your ASR Configuration Server and open a CMD prompt as administrator. Browse to the bin directory for your ASR installation. For example, in my case ASR is installed on the E: partition under the following directory:

E:\Program Files (x86)Microsoft Azure Site Recoveryhomesvsystemsbin

Type in this command to remove the VM from the ASR database (replace IP address with the IP of your VM):

~~~perl
perl Unregister-ASRComponent.pl -IPAddress 10.0.0.4 -Component Source
~~~

That’s it. You should now be able to reconfigure replication for the VM, and ASR will discover the correct info about the VM.