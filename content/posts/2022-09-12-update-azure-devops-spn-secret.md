---
title: 'Update Azure Devops SPN Secret'
author: Ryan
date: '2022-09-12'
layout: post
draft: false
categories:
    - 'Software Development'
    - Azure Devops
    - Devops
tags:
    - Azure
    - Software
    - Devops
---

If you need to update the secret for a service principal in Azure Devops, prior to it expiring, you may be surprised to find that this cannot be done via the Azure Portal.

In this article, I'll show you two methods for updating a secret for a service principal prior to expiration.

# Update the secret via the Azure Devops Portal:

- Go to "Service Connections" in the Azure Devops portal
- Find the SPN you want to update, then click "Manage Service Principal"
- Then on the service principal page, click Certificates & Secrets
- Create a "New Client Secret", take note of the value
- Delete the 'old' secret
- Return to the Service Connection in the Azure Devops portal
- Click Edit - click the verify button. It should tell you the client certificate has expired
- Now you need to make an arbitrary change and save it. I just type a character in the optional description and save.
- Now edit again and click verify, it will now pick up the new client secret and all is happy.
- You can now remove whatever you added to the description.