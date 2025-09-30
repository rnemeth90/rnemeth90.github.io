---
title: 'Linux Major/Minor Page Faults'
date: '2025-09-28T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
- Linux
---

In this article we'll take a quick look at major/minor page faults in Linux. 

Minor Page Faults: These occur when a process attempts to access a memory page that is already present in physical RAM but is not yet mapped into the process's own virtual address space. The operating system handles these faults by simply updating the process's page table to include the mapping to the existing page in RAM. This is a relatively fast operation, as no data needs to be loaded from disk. A high number of minor page faults could be indicative of the process uses many shared objects/libraries.

Major Page Faults: These occur when the CPU needs a memory page that isn't currently in RAM and must therefore be read from secondary storage such as a hard disk. High numbers of major page faults often indicate RAM pressure, meaning the system doesn't have enough physical memory for the running processes, leading to performance degradation as data is swapped between memory and disk.

You can view the number of major/minor page faults per process using `ps`:

```
sudo ps -eo min_flt,maj_flt
```

Though, I like to sort by the page fault type (depending on what I'm looking for). This example sorts by major page faults:

```
$ sudo ps -eo maj_flt,min_flt,cmd | sort -k 2 -r |

 MAJFL  MINFL CMD
 5    878 /usr/lib/at-spi-bus-launcher
 2    824 /usr/lib/at-spi2-registryd --use-gnome-session
15    776 /usr/lib/bluetooth/bluetoothd
 1    769 /usr/lib/gvfsd-trash --spawner :1.8 /org/gtk/gvfs/exec_spaw/0
 1    747 /usr/lib/gvfsd-network --spawner :1.8 /org/gtk/gvfs/exec_spaw/1
 1    727 /usr/lib/dconf-service
 1    649 /usr/lib/rtkit-daemon
746 6493645 /usr/lib/Xorg -nolisten tcp :0 vt1 -keeptty -auth /tmp/serverauth.hfXw7uuabb
20   6299 /usr/lib/iwd/iwd
 0    489 /usr/lib/pulse/gsettings-helper
 1  47023 /usr/lib/systemd/systemd-udevd
163 431960 /usr/lib/systemd/systemd-journald
 4    367 /usr/lib/gvfsd-fuse /run/user/1000/gvfs -f
45   2526 /usr/lib/systemd/systemd-resolved
 9   1834 /usr/lib/upowerd
 0    173 grep --color=auto -i /usr/lib
 2   1656 /usr/lib/systemd/systemd-logind
 0   1654 /usr/lib/systemd/systemd --user
 4   1617 /usr/lib/polkit-1/polkitd --no-debug --log-level=notice
33   1407 /usr/lib/udisks2/udisksd
 3   1343 /usr/lib/gvfsd
 6   1339 /usr/lib/gvfs-udisks2-volume-monitor
 4   1139 /usr/lib/systemd/systemd-timesyncd
 2   1097 /usr/lib/systemd/systemd-homed
 4   1073 /usr/lib/power-profiles-daemon
 1  10172 /usr/lib/systemd/systemd-userdbd
```

Based on the output, we can determine that `systemd-userdbd` is using a lot of shared code.
