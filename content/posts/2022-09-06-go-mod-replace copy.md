---
title: 'Use “replace” in go.mod to Point to a Local Module'
author: Ryan
date: '2022-09-06'
layout: post
draft: false
categories:
    - 'Software Development'
    - golang
tags:
    - Dev
    - Programming
    - Software
    - golang
---

<<<<<<< HEAD
If you want to the local version of a dependency in Go rather than one in a remote repository, use the **replace** keyword.
=======
If you want to the local version of a dependency in Go rather than one in a remote repository, use the *replace* keyword.
>>>>>>> 81523e22c9593c19cae2a637126f78b89f76459e

The replace line goes above your require statements, like so:

~~~shell

    module github.com/rnemeth90/foo

    replace github.com/rnemeth90/bar => /Users/rnemeth90/Projects/bar

    require (
    	github.com/rnemeth90/bar v1.0.0
    )
~~~
<<<<<<< HEAD
Now when you compile this module **go build** or **go install**, it will use your local code rather than the remote dependency.
=======
Now when you compile this module ~go build~ or ~go install~, it will use your local code rather than the remote dependency.
>>>>>>> 81523e22c9593c19cae2a637126f78b89f76459e

According to the docs, you do need to make sure that the code you’re pointing to also has a **go.mod** file:

> **Note**: if the right-hand side of a `replace` directive is a filesystem path, then the target must have a `go.mod` file at that location. If the `go.mod` file is not present, you can create one with `go mod init`.
>
> [https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive](https://github.com/golang/go/wiki/Modules#when-should-i-use-the-replace-directive)

<<<<<<< HEAD
You can also create this line from the command line using the **go mod edit** command.
=======
You can also create this line from the command line using the **go mod edit**
>>>>>>> 81523e22c9593c19cae2a637126f78b89f76459e

    $ go mod edit -replace github.com/rnemeth90/bar=/Users/rnemeth90/Projects/bar

Following the **\-replace** is first what you want to replace, then an equals sign, then what you’re replacing it with.

Hopefully this helps someone who was stuck with this like me 🙂