---
title: 'Querying REST APIs with Powershell'
author: Ryan
date: '2022-08-04'
layout: post
draft: false
categories:
    - 'Software Development'
    - Powershell
tags:
    - Dev
    - Programming
    - Software
    - json
    - rest
    - powershell
---

This will be a short post on querying REST APIs with Powershell.

It's hard to argue that REST APIs are the predominant technology for interacting
with networked services. They provide a gateway for interacting with a 3rd party (or self-hosted)
product without having to go through the exercise of a more complicated integration. REST APIs communicate
in a common format, typically JSON. However, most will allow us to choose the response format by specifying an
option in the 'Accept' header.  Most languages provide a native method for interacting with
REST APIs. This objective for this post is to show you how simple this is with Powershell.

To get started, we'll need a public API to interact with. I'm going to use https://icanhazdadjoke.com/, because
there is no authentication and no rate-limiting (two concepts we will cover in another post).

Calling the API is extremely simple:
~~~Powershell
$url = "https://icanhazdadjoke.com/"

Invoke-RestMethod -Uri $url -Method Get
~~~

However, this results in the content being returned as plain text. This isn't ideal.

Let's pass the 'Accept' header to tell the API the format we are expecting to be returned:
~~~Powershell
$url = "https://icanhazdadjoke.com/"
$headers = @{
    'Accept' = 'application/json'
}
Invoke-RestMethod -Uri $url -Method Get -Headers $headers
~~~

Output:
~~~Powershell
[15:04:34] C:\..\..\rnemeth90.github.io on main   +1  ❯  Invoke-RestMethod -Uri $url -Method Get -Headers $headers

id          joke                                                  status
--          ----                                                  ------
3LmyXvsPfqc I don't trust stairs. They're always up to something.    200
~~~

That looks a little better. For those of you familiar with Powershell, the output above probably
looks completely normal. But for those not-so-familiar with Powershell, or those expecting
more of a 'json-esk' output, this may look a bit... weird.

Powershell is an object oriented language. **Everything is an object** in Powershell, even the response
of this request. What you see in the output is simply the properties of the object.

Luckily Powershell provides us with a cmdlet to convert an object into json (aptly named: ConvertTo-Json). We can use it like this:
~~~Powershell
$url = "https://icanhazdadjoke.com/"
$headers = @{
    'Accept' = 'application/json'
}
Invoke-RestMethod -Uri $url -Method Get -Headers $headers | ConvertTo-Json
~~~

Here we are piping the output from Invoke-RestMethod to ConvertTo-Json. Pretty neat!

Output:
~~~Powershell
[15:04:35] C:\..\..\rnemeth90.github.io on main   +1  ❯  Invoke-RestMethod -Uri $url -Method Get -Headers $headers | Convertto-json
{
  "id": "AAdFBXnGlyd",
  "joke": "If you walk into a forest and cut down a tree, but the tree doesn't understand why you cut it down, do you think it's stumped?",
  "status": 200
}
~~~

Now, that looks more normal.

There is much more we can do with Invoke-RestMethod. The 'Method' parameter of this cmdlet accepts any of the common
HTTP methods (GET, PUT, PATCH, DELETE, POST, HEAD). You can also specify other headers and a body (using the -body parameter).

Both of these parameters accept dictionaries:

~~~Powershell
$url = "https://icanhazdadjoke.com/"
$headers = @{
    'Accept' = 'application/json'
    'Host' = 'MyServer'
}
$body = @{
    'Eat' = 'Pizza'
}
Invoke-RestMethod -Uri $url -Method Get -Headers $headers -Body $body | ConvertTo-Json
~~~

Unfortunately I won't be able to show the other HTTP methods, as this API only supports GET requests. So that's all for now.
