---
id: 140
title: 'Access is Denied When Attempting to Delete a Dynamic Distribution Group'
date: '2017-06-12T13:41:00+00:00'
author: Ryan
layout: post
image: /wp-content/uploads/2017/06/2017-06-12_09h29_20.png
categories:
    - Uncategorized
tags:
    - ActiveDirectory
    - Exchange
---

You may receive the error below when attempting to delete a dynamic distribution group.

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-12_09h29_20.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-12_09h29_20.png)

To resolve this, open ADUC and show advanced features (Click View > Advanced Features). Then find the object for the dynamic distribution group and open the properties window. Browse to the “Object” tab and uncheck the “Protect object from accidental deletion” box. Wait for ADDS to replicate or force replication yourself.

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-12_09h34_20.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-12_09h34_20.png)

Go back to the ECP and you should be able to delete the group.