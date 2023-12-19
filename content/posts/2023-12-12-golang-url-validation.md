---
title: 'Validating URLs with Go'
author: Ryan
date: '2023-12-19'
layout: post
draft: false
categories:
    - golang
    - web development
    - software development
tags:
    - golang
    - web development
    - software development
    - url
---

## Introduction
In this post, we'll take a quick look at URL validation using Golang. It's common to implement URL validation as a task within a HTTP request pipeline, typically as middleware. There are many different definitions of "validation". For the purpose of this article, we will simply validate that a URL conforms to a particular text pattern. 

I often see people (mistakenly) use URL and URI interchangeably. URL is actually is a sub-type of URI. A URL is a reference to a web resource, typically seen as a web address (e.g. https://golang.org/project/). A URI, on the other hand, can be used to identify any type of resource, not just those on the internet.

To validate a URL in Go, we could test our URL against a regex pattern, such as `https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`. However, the Golang team was nice enough to provide this functionality to us via the net/url package. 

To validate a URL, we can simply use the `url.ParseRequestURI()` function. The definition of this function is below (taken from pkg.go.dev)

```
func ParseRequestURI(rawurl string) (*URL, error)

ParseRequestURI parses rawurl into a URL structure. It assumes that rawurl was received in an HTTP request, so the rawurl is interpreted only as an absolute URI or an absolute path. The string rawurl is assumed not to have a #fragment suffix. (Web browsers strip #fragment before sending the URL to a web server.)
```

Let's see how we can use `url.ParseRequestURI()`:

```
package main

import (
  "log"
  "net/url"
)

func main() {
  u, err := url.ParseRequestURI("hello")
  log.Printf("err=%+v url=%+v\n", err, u)

  u, err = url.ParseRequestURI("http://rnemeth90.github.com/")
  log.Printf("err=%+v url=%+v\n", err, u)

  u, err = url.ParseRequestURI("http://golang.org/index.html?#page1")
  log.Printf("err=%+v url=%+v\n", err, u)

  u, err = url.ParseRequestURI("golang.org")
  log.Printf("err=%+v url=%+v\n", err, u)
}
```

Which outputs the following:
```
2023/12/19 19:50:07 err=parse "hello": invalid URI for request url=<nil>
2023/12/19 19:50:07 err=<nil> url=http://rnemeth90.github.com/
2023/12/19 19:50:07 err=<nil> url=http://golang.org/index.html?#page1
2023/12/19 19:50:07 err=parse "golang.org": invalid URI for request url=<nil>
```

That's it! This is a short article, but it's just that easy to validate URLs in Go. I was learning about this recently and wanted to document what I learned. Until next time!

