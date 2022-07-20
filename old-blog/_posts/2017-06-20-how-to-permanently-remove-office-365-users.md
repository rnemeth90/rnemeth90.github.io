---
id: 135
title: 'How to Permanently Remove Office 365 Users'
date: '2017-06-20T18:13:00+00:00'
author: Ryan
layout: post
image: /wp-content/uploads/2017/06/2017-06-20_14h06_20.png
categories:
    - Uncategorized
tags:
    - Exchange
    - Office365
---

After deleting a user in Office 365, their account is moved to a ‘recycle bin’ for 30 days. This allows the user account to be easily recovered. This can often cause issues when attempting to recreate a mailbox while a hybrid configuration is in place.

To permanently delete the user within Office 365, first delete the user in the Office 365 Admin Portal or using Powershell. Then, connect to your Azure Active Directory environment with Powershell using the “Connect-MsolService” cmdlet.

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h06_20.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h06_20.png)

To see a list of user accounts currently in the recycle bin, run this cmdlet:

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h09_47.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h09_47.png)

Then, to permanently delete all accounts in the recycle bin, run this cmdlet:

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h10_16.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h10_16.png)

To remove a specific user, run this cmdlet:

[![](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h11_15.png)](https://rnemeth90.github.io/wp-content/uploads/2017/06/2017-06-20_14h11_15.png)