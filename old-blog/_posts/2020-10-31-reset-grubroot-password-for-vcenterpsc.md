---
id: 73
title: 'Reset GRUB/root Password for vCenter/PSC Appliance'
date: '2020-10-31T01:22:00+00:00'
author: Ryan
layout: post
categories:
    - Uncategorized
tags:
    - Linux
    - vmware
---

In Redhat/Fedora/Cent, GRUB can be protected by running the grub-md5-crypt command and pasting the outputted password hash into the grub.conf file. vSphere 6.0 password protects grub by default. If you change the root password in the VAMI, the GRUB password is changed to match. If you do not change the root password, the GRUB password is “vmware”.

To reset the GRUB password, we need to boot into a Cent or Redhat live CD. The ISO can be obtained here: <https://www.centos.org/download/>. Its best to upload the ISO to a datastore that the appliance has access to.

Stop the appliance and attach the ISO:

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image.png)

Be sure to select the “Connect at Power On” option. Boot the VM into the ISO and select the “Troubleshooting” option.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-1.png)
Next, choose “Rescure a Red hat (or CentOS depending on your ISO) Enterprise Linux System”

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-2.png)


Select “Continue” to mount the VCSA 6.0’s root filesystem in Read/write mode under /mnt/sysimage. RHEL 7.2 is capable to detect the VCSA’s root volume and mounts it.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-3.png)

The VCSA root filesystem is mounted under /mnt/sysimage and you can now access (and modify) it using the shell. Navigate to /mnt/sysimage/boot and list the contents. You’ll see we now have access to the grub directory:

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-4.png)

cd to the grub directory and list the contents. Look for a file called “menu.lst”. This file holds the grub boot loader password. Open this file with vi by typing “vi menu.lst”. Navigate to the line beginning with “password” using the arrow keys, and then type “dd” to remove the line.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-5.png)
You can then save the file by pressing “:wq” (without quotes). You can now cat the file and see that the password has been removed.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-6.png)

Exit the shell (this will reboot the server). Detach the ISO and boot the appliance. Once the system is booted, stop the VCSA in the GRUB menu (by pressing the escape key during boot) to break the OS root password.

[](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-7.png)
Press “e” to edit the boot commands for the kernel.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-8.png)

Append “init=/bin/bash” to the line in this step and press enter.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-9.png)

Press “b” to boot the system.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-10.png)

You will now boot into a bash shell where you can set the root password.

![](https://rnemeth90.github.io/wp-content/uploads/2020/10/image-11.png)

Once this is done, exit the shell by typing “exit”. You can now boot the appliance and login with your new root password.