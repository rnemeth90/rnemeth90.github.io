---
title: 'Running Arch Linux on the Framework Laptop 13'
author: Ryan
date: '2024-02-02'
layout: post
draft: true
categories:
    - golang
    - web development
    - software development
tags:
    - golang
    - web development
    - software development
    - url
---

I recently purchased a Framework laptop with the intention of replacing my Dell XPS. In this blog post, I'll cover some of the setup and configuration, as well as my reasoning for purchasing a Framework laptop.

# Why Framework?
Framework is a relatively new 
TL;DR; I’m extremely impressed and very happy with this laptop - it is by far one of the best devices I’ve owned in a long time. It is near-silent, It uses ~3watts at idle, it’s fast, it’s sturdy and it looks good!

# Why Arch?


# BIOS Settings
You can find the BIOS guide on the Framework community website. The only settings I changed were:

CPU Configuration -> Boot Performance mode: MAX BATTERY
CPU Configuration -> Intel Turbo Boost Max Technology 3.0: DISABLED
Secure Boot -> Enforce Secure Boot: DISABLED
The above causes the laptop to effectively run in a lower TDP setting. I think it goes from 28watts to 22watts. This has a dramatic effect on the battery life and thermals of the device. I don’t want a wild beast that blasts the fans as soon as I type ls, so these settings are great for me. Did I mention the laptop performs really great with these settings?

With the above and the settings I configure in TLP I get ~3watts idle with screen on normal brightness, Wi-Fi and Bluetooth enabled, and about ~45 celsius core temperatures.

Basic installation:
Basically, download the ISO and follow the installation guide. I opted to use systemd-boot as boot manager and NetworkManager as my network configuration tooling.

Additional kernel parameters I use:
Whichever boot manager you use, you might want to set a few extra kernel parameters. I found the following additionals handle a bunch of stuff nicely on my Framework Laptop 13:

```
net.ifnames=0 libata.allow_tpm=1 module_blacklist=cros_ec_lpcs,hid_sensor_hub acpi_osi="!Windows 2020" tpm_tis.interrupts=0 nvme.noacpi=1 mem_sleep_default=s2idle split_lock_detect=off
```

i3

x11 vs wayland

CpuPowerPermalink
The cpupower service reads from /etc/default/cpupower and configures the default scheduler. Edit that file to set the default scheduler to powersave or performance and then enable it:

AvahiPermalink
I don’t want any service auto-configuring stuff on my system, especially things like printers for example. Therefore I disable the Avahi zeroconf service:

# Bluetooth
systemctl enable --now bluetooth.service

# TLP
TLPPermalink
Enable tlp with:

systemctl enable --now tlp.service
TLP is used to manage power-saving modes of various hardware. It is usually configured to enable power-saving when not connected to AC, and to disable it when connected to AC. It does that for all kinds of things, like Wi-Fi, USB, PCIe, Bluetooth, the CPU scheduler, etc.

I’ve made a custom TLP configuration for my Framework Laptop 13 which you can install as follows:
```
cat <<EOF > "/etc/tlp.d/01-custom.conf"
CPU_SCALING_GOVERNOR_ON_AC=powersave
CPU_SCALING_GOVERNOR_ON_BAT=powersave

CPU_BOOST_ON_AC=0
CPU_BOOST_ON_BAT=0

PCIE_ASPM_ON_BAT=powersupersave

PLATFORM_PROFILE_ON_AC=balanced
PLATFORM_PROFILE_ON_BAT=low-power

USB_ALLOWLIST=32ac:0002
USB_EXCLUDE_BTUSB=1
USB_EXCLUDE_PRINTER=0

WIFI_PWR_ON_AC=off
WIFI_PWR_ON_BAT=off

WOL_DISABLE=N
EOF
```

```
sudo systemctl enable --now tlp.service
```

