---
id: 232
title: 'User Account Control'
date: '2012-11-15T16:01:00+00:00'
author: Ryan
draft: false
layout: post
image: /wp-content/uploads/2014/11/UAC2BBlue.png
categories:
    - Uncategorized
tags:
    - Windows
---

Many people rarely pay close attention to those pesky User Account Control prompts that pop up when attempting to run a program as an administrator. When a user logs into her account, she is assigned a security token based on the level of access that she has (basic user or admin). This token is what defines what programs are allowed to do. Using this concept, the users session is incapable of making changes that would affect the entire system.

For a standard user, a token with the most basic privileges is assigned. Administrators have two tokens assigned, the first token contains all privileges usually awarded to an administrator (unrestricted), and the second is similar to that awarded to a basic user. This way, all programs that the administrator runs, including the Windows Shell, are run in basic user mode (this is why administrators still receive UAC prompts, but do not get asked for credentials). When an application requests higher privileges, the higher integrity token is used.

User Account Control prompts each have their own meaning based on the color (blue, grey, yellow, or red. The blue prompt (Figure 1) means that a built in Windows component that is signed by Microsoft is requesting administrative privileges to continue. This prompt has a multicolored shield in the upper left corner. The grey prompt (Figure 2) means a software application that is signed by a third party developer is requesting admin privileges. This prompt has a yellow shield with a black exclamation mark in the upper left corner. The yellow prompt (Figure 3) signifies that a unsigned executable is requesting administrator privileges. This prompt also had a yellow shield with black exclamation mark in the upper left corner, and looks somewhat generic. Finally, the red prompt (Figure 4) means a program that was specifically blocked by an administrator has attempted to run.

[![](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BBlue.png)](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BBlue.png)

 Figure 1

[![](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BGrey.png)](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BGrey.png)

 Figure 2

[![](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BYellow.png)](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BYellow.png)

Figure 3

[![](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BRED.png)](https://rnemeth90.github.io/wp-content/uploads/2014/11/UAC2BRED.png)

Figure 4