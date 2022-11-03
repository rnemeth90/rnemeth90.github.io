---
title: 'Chaining YAML Pipelines in Azure Devops'
author: Ryan
date: '2022-11-03'
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

In this article, we'll take a quick look at chaining two pipelines together in Azure Devops, so that the completion of one pipeline, triggers the other to run.
Microsoft documentation is leaps and bounds ahead of where it used to be. However, I still feel like there is a lot of room for improvement, as it took me a while to
figure this out.

Our two pipelines will exist in the same repository. We have a dependent-pipeline, that we only want to run once the source-pipeline is finished. This is useful if you have
some infrastructure you want to build, prior to deploying something to that infrastructure.

The process is actually quite simple. First, let's define our source pipeline:

~~~yaml
# source-pipeline

trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- script: echo Hello, world!
  displayName: 'Run a  one-line script'

- script: |
    echo Add other tasks to build, test, and deploy your project.
    echo See https://aka.ms/yaml
  displayName: 'Run a multi-line  script'

~~~

Nothing fancy here, just the build in template pipeline that Microsoft gives us for free when we create a "Starter Pipeline".

Now, let's create another pipeline in the same repo that will be triggered when the pipeline above completes:

~~~yaml
# dependent-pipeline

trigger:
- none # we want this pipeline to be triggered manually, not based on PR, etc.

pool:
  vmImage: ubuntu-latest

resources:
  pipelines:
    - pipeline: source-pipeline #this can be anything
      source: 'source-pipeline' #this needs to be the name of the 'source' pipeline
      trigger: true # Run dependent-pipeline pipeline when any run of security-lib-ci completes

steps:
- script: echo Hello, world!
  displayName: 'Run a one-line script'

- script: |
    echo Add other tasks to build, test, and deploy your project.
    echo See https://aka.ms/yaml
  displayName: 'Run a multi-line script'
~~~

The resources block above defines our dependency. You want to be sure to configure the trigger of the dependent pipeline appropriately as well.

There are several options for fine-tuning this process. See the office Microsoft documentation below:

[Link to the Microsoft Docs](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops)