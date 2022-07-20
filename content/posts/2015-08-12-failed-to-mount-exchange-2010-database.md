---
id: 202
title: 'Failed to Mount Exchange 2010 Database'
date: '2015-08-12T12:59:00+00:00'
author: Ryan
layout: post
image: /wp-content/uploads/2015/08/1-1.png
categories:
    - Uncategorized
tags:
    - Exchange
    - WindowsServer
---

Recently, one of my users’ came to me and said he was missing two months worth of email. This was just after migrating to Exchange Online. We were using Exchange 2010 with System Center DPM for backups.


I restored the database that the users’ mailbox was on from a backup then copied it over to the Exchange server from the network share I restored it to. All was going well, until I tried to mount the darn thing.

I was getting this error and could not for the life of me decry-pt the meaning of it. There is obviously some type of IO issue/file not found. But what could it be?

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/1-1.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/1-1.png)

I figured I’d better kick this one off with some basic troubleshooting. First, I checked the health of the database and made sure it was clean. Passed that test…

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/2-1.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/2-1.png)

Then ran a repair on the database, to no avail.

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/3-1.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/3-1.png)

After racking my brain for a good thirty minutes, and a few failed Google searches, I found the solution. It was so simple! I created the log file directory in the folder with the database, and voila, the database mounted without a single error!

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/7.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/7.png)

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/4-1.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/4-1.png)[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/5-1.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/5-1.png)

I was able to see the ‘supposed’ location of the log file by opening the Exchange Management Shell and running the ‘Get-MailboxDatabase’ cmdlet, like so:

*Get-MailBoxDatabase –Identity <Recovery DB Name> | FL Name, ServerName, EDBFilePath, LogFolderPath*

[![](https://rnemeth90.github.io/wp-content/uploads/2015/08/6.png)](https://rnemeth90.github.io/wp-content/uploads/2015/08/6.png)


I’m not sure why the database mounting process isn’t capable of creating the log file directory… I think Microsoft would have thought and planned for a situation like this. Hope this helps!