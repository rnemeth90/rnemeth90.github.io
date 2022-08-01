---
title: 'Reading Json Files with Go'
author: Ryan
date: '2022-07-21'
layout: post
draft: false
categories:
    - 'Software Development'
    - Go
tags:
    - Go
    - Dev
    - Programming
    - Software
    - json
---

JSON is a widely used format for representing structured data. Developers like it because it is easy to read, most common languages have a library for interacting
with it, and most public APIs accept JSON in HTTP requests.

In this post, we'll look at parsing a JSON file using Go! We will be using the io/ioutil package to open a json file on local disk, and encoding/json to parse the
JSON data within the file into a memory structure.

Let's assume we have the following JSON data representing an employee:

~~~json
{
  "Id": 1,
  "firstName": "Steve",
  "lastName": "Rogers",
  "alias": "Captain America",
  "Department": "Avengers"
}
~~~

We need a way of representing this data in memory when decoding it from JSON. For this, we will need to create a struct:

We will build up our go module as we progress through the article

Let's start:
~~~go
// main.go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

// Hero represents an hero
// ALL fields must be exportable! Otherwise the JSON parsing will fail.
type Hero struct {
	Id        int
	FirstName string
	LastName  string
	Alias     string
	Group     string
}

func main() {

	// Here we set the log prefix. When reading stack traces, this makes it easier to know
	// where a failure occurred.
	log.SetPrefix("main(): ")

	// We first need to load the JSON file into memory
	content, err := ioutil.ReadFile("./heros.json")
	if err != nil {
		log.Fatal("Error opening the file: ", err)
	}

	// Now we parse the JSON data into a memory structure. We know our JSON file will have more than one hero object,
  // so we'll use make() to create a []Hero slice. Since go is a pass-by-value language, we will then use the address-of
  // operator (&) to unmarshal our json data into the heros slice
	heros := make([]Hero, 5)
	err = json.Unmarshal(content, &heros)
	if err != nil {
		log.Fatal("Error occurred during unmarshal: ", err)
	}

	// now we can read/interact with the data. We'll loop over the array
  // and print the values in memory
	for i := 0; i < len(heros); i++ {
		fmt.Println(heros[i].Id)
		fmt.Println(heros[i].FirstName)
		fmt.Println(heros[i].LastName)
		fmt.Println(heros[i].Group)
	}
}
~~~

Create a file named employees.json with similar data:
~~~json
[
  {
    "Id": 1,
    "firstName": "Steve",
    "lastName": "Rogers",
    "alias": "Captain America",
    "group": "Avengers"
  },
  {
    "Id": 2,
    "firstName": "Clark",
    "lastName": "Kent",
    "alias": "Superman",
    "group": "Justice League"
  }
]
~~~

Now, we can run our main.go file:

~~~shell
11:40:47 ryan@xerxes json → go run main.go
1
Steve
Rogers
Avengers
2
Clark
Kent
Justice League
11:40:49 ryan@xerxes json
~~~

Pretty simple! That's why I love go. We accomplished all of this with ~50 lines of code.
Doing something similar in asp.net project would easily double that count and involve creating
multiple files! (nothing against asp.net or c#, I think c# is a great language and use it daily)

Now, 'go' try this!