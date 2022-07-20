---
id: 319
title: 'Active Directory Migration Toolkit The RPC Server is Unavailable'
date: '2022-01-14T21:55:56+00:00'
author: Ryan
layout: revision
---

When migrating computer objects using the Active Directory Migration Tool, you may encounter the following error:

[![](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-03_11h20_09.png)](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-03_11h20_09.png)

In addition, the Migration Log may show the following error:

[![](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-03_11h20_20.png)](https://rnemeth90.github.io/wp-content/uploads/2018/08/2018-08-03_11h20_20.png)

This is typically caused by a host-side firewall. To resolve this, deploy a GPO to disable the Windows firewall prior to migrating the computer account. I like to create a special OU for computers (I typically name it “PreMigration”) that I will move computer objects to prior to migrating them. This OU will have two policies applied. One to disable the Windows Firewall and another to start the Remote Registry service. Both are required for the computer object to successfully migrate.