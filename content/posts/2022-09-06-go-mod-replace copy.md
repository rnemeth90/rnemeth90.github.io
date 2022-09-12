---
title: 'Use “replace” in go.mod to Point to a Local Module'
author: Ryan
date: '2022-09-06'
layout: post
draft: true
categories:
    - 'Software Development'
    - golang
tags:
    - Dev
    - Programming
    - Software
    - golang
---

If you want to say, point to the local version of a dependency in Go rather than the one over the web, use the **replace** keyword.

The replace line goes above your require statements, like so:

    module github.com/rnemeth90/foo

    replace github.com/rnemeth90/bar => /Users/rnemeth90/Projects/bar

    require (
    	github.com/rnemeth90/bar v1.0.0
    )


And now when you compile this module (**go install**), it will use your local code rather than the other dependency.

According to the docs, you do need to make sure that the code you’re pointing to also has a **go.mod** file:

> **Note**: if the right-hand side of a `replace` directive is a filesystem path, then the target must have a `go.mod` file at that location. If the `go.mod` file is not present, you can create one with `go mod init`.
>
> [https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive](https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive)

You can also create this line from the command line using the **go mod edit**

    $ go mod edit -replace github.com/rnemeth90/bar=/Users/rnemeth90/Projects/bar

Following the **\-replace** is first what you want to replace, then an equals sign, then what you’re replacing it with.

Hopefully this helps someone else get a quick answer to “how do I do this” in the future 🙂