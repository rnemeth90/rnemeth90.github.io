---
id: 38
title: 'Azure Tenant Maintenance &#8211; Purge Empty Resource Groups'
date: '2022-01-14T18:43:35+00:00'
author: Ryan
layout: post
gd_system_blocks_used:
    - '{"core/paragraph":49,"core/image":8,"core/list":1}'
categories:
    - Uncategorized
---

This will be the first article in a series about maintaining Azure tenants and subscriptions.

If you currently, or have ever, worked in a large Azure environment, you know how easily resource creep can occur. Resource Groups, VM disks and network interfaces, network security groups, etc. can easily fall out of sight and be forgotten about. This isn’t a big concern for resources that are free of cost, like resource groups. However, if you delete several virtual machines, the disks that were attached to those virtual machines linger, and you continue to pay the cost of storing them.

In this blog post, we will review a script I created for removing empty resource groups. We will then add this script to an Azure Automation Account and link it to a schedule. We will assume you already have an Azure Automation Account in existence, and the Automation Account has a credential object named ‘AzureRunAsConnection’.

To get started, you can download the script here:

<https://github.com/rnemeth90/azure-automation/blob/master/clean-empty-resource-groups.ps1>

This particular runbook will require that the “AZ.Resources” module be loaded in the Automation Account. To import this module, go to your automation account and then click on “Modules” under “Shared Resources”. Then, click on “Browse Gallery”.

[](https://www.rnemeth90.github.io/content/images/2021/06/image.png)

In the search bar, type in “Az.resources”, then click on the module and click “Import”. If you see a message like this, you will need to add any modules that az.resources depends on before importing it.

[](https://www.rnemeth90.github.io/content/images/2021/06/image-1.png)

You can go back and add those modules using the same process, and then attempt to import the “Az.resources” module again. Importing these modules may take several minutes. In my experience, it takes around 10-15 minutes.

Once these modules are imported you can import the PowerShell runbook you downloaded earlier from Github. To do that, browse to the Runbooks section of your Automation Account and then click “Import a Runbook”:

[](https://www.rnemeth90.github.io/content/images/2021/06/image-2.png)

In the context menu that appears, browse to the runbook and upload it, choose “PowerShell” as the runbook type, and then click Create:

[](https://www.rnemeth90.github.io/content/images/2021/06/image-3.png)

In the Editor Pane, click on “Test Pane”. This will bring you to the Test Pane for the runbook. This will allow you to test the runbook before running it in your environment. Click “Start” in the Test Pane. This particular runbook will output to screen any changes it will make, so you can see the results here.

As you can see here, the runbook did find some empty resource groups, but did not remove them:

[](https://www.rnemeth90.github.io/content/images/2021/06/image-4.png)

This is because we have a variable in the runbook that controls whether or not any write/update actions will be taken on resources. Click the X in the upper right corner to go back to the editor, and change the value in the screenshot below from “0” to “1”.

[](https://www.rnemeth90.github.io/content/images/2021/06/image-8.png)

If you’d like, you can test the runbook again, or you can click “Publish” to publish it to your Automation Account. Once it’s published, you can link it to a schedule so that it runs automatically.

Click “Publish”:

<[](https://www.rnemeth90.github.io/content/images/2021/06/image-9.png)

Then, on the Runbook page, click “Schedules”, and then “Add a schedule”:

[](https://www.rnemeth90.github.io/content/images/2021/06/image-10.png)

Fill out the wizard that pops up to create a schedule and link it to your workbook. This concludes this article.

In the next post, we will take a look at removing empty resource groups automatically. Stay tuned.