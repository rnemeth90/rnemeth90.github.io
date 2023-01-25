---
title: 'Golang: When Identical Strings are Not Equal'
author: Ryan
date: '2023-01-24'
layout: post
draft: false
categories:
    - Golang
    - Devops
    - Software Development
tags:
    - Golang
    - Devops
    - Software Development
---

*This will be a quick and dirty post, so please forgive any spelling/grammar mistakes.*

I was writing a little CLI tool in Golang to track todo items. Just a dumb little app to help hone my skills a bit, but still something useful that serves a purpose to me. I don't write a ton of code at work (mostly just scripting/pipelines when I do), so I'm constantly working on something like this in my spare time. Anyway, I was writing this app, got everything working like I wanted it to. I then wrote some of the tests and was iterating over them. I noticed the `ListTasks` test was failing:

~~~go
func TestAddTask(t *testing.T) {
	task := "test task number 1"

	dir, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}

	cmdPath := filepath.Join(dir, binaryName)

	t.Run("AddNewTask", func(t *testing.T) {
		cmd := exec.Command(cmdPath, "-add", task)

		if err := cmd.Run(); err != nil {
			t.Fatal(err)
		}
	})

  // failing test
	t.Run("ListTasks", func(t *testing.T) {
		cmd := exec.Command(cmdPath, "-list")
		out, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatal(err)
		}

		expected := fmt.Sprintf("[ ] 1: %s", task)

		if strings.Compare(string(out), expected) != 0 {
			t.Errorf("got %v, expected %v\n", out, []byte(expected))
		}
	})
}

~~~

Seems strange, considering the strings appear to be equivalent in the output:

~~~sh
ryan:todo/  |main U:4 ?:1 ✗|$ go test -v
Building tool...
using /tmp/.testtodo.json
running...
=== RUN   TestAddTask
=== RUN   TestAddTask/AddNewTask
=== RUN   TestAddTask/ListTasks
    main_test.go:82: got [ ] 1: test task number 1
        , expected [ ] 1: test task number 1
--- FAIL: TestAddTask (0.00s)
    --- PASS: TestAddTask/AddNewTask (0.00s)
    --- FAIL: TestAddTask/ListTasks (0.00s)
FAIL
cleaning up...
exit status 1
FAIL    github.com/rnemeth90/todo/cmd/todo      0.105s
~~~

What could be happening? After banging my head on the desk a few times, a revelation came to me...

In Go, strings are simply slices of bytes. I decided to print out each string as a byte array:

~~~sh
ryan:todo/  |main U:4 ?:1 ✗|$ go test -v
Building tool...
using /tmp/.testtodo.json
running...
=== RUN   TestAddTask
=== RUN   TestAddTask/AddNewTask
=== RUN   TestAddTask/ListTasks
    main_test.go:80: got [91 32 93 32 49 58 32 116 101 115 116 32 116 97 115 107 32 110 117 109 98 101 114 32 49 32 10 10], expected [91 32 93 32 49 58 32 116 101 115 116 32 116 97 115 107 32 110 117 109 98 101 114 32 49]
--- FAIL: TestAddTask (0.00s)
    --- PASS: TestAddTask/AddNewTask (0.00s)
    --- FAIL: TestAddTask/ListTasks (0.00s)
FAIL
cleaning up...
exit status 1
FAIL    github.com/rnemeth90/todo/cmd/todo      0.144s
~~~

Let's take a closer look at the byte arrays from the test output:
~~~sh
got      [91 32 93 32 49 58 32 116 101 115 116 32 116 97 115 107 32 110 117 109 98 101 114 32 49 32 10 10]
expected [91 32 93 32 49 58 32 116 101 115 116 32 116 97 115 107 32 110 117 109 98 101 114 32 49]
~~~

We can see the byte array returned from `cmd.CombinedOutput()` has some additional bytes in it at the end (32,10,10). What exactly are 32, 10, and 10? To figure this out, I went over to the (go playground)[https://go.dev/play/].

Let's see what happens when we create a byte array with a single number and print it out as a string to the console:

[![](https://rnemeth90.github.io/images/golang-strings-not-equal-01.png)](https://rnemeth90.github.io/images/golang-strings-not-equal-01.png)

Interesting, we can see that `m` was output to the console. So what do our mysterious additional characters in our test result represent? Let's see:

[![](https://rnemeth90.github.io/images/golang-strings-not-equal-02.png)](https://rnemeth90.github.io/images/golang-strings-not-equal-02.png)

It's hard to tell from the output, but if you look in the results pane, you'll see a space and two new lines. So `32` represents a space, and `10` represents a new line!

You can play with this code yourself: https://go.dev/play/p/fGUIxJM6KnV

Ok, so let's fix our failing test:

~~~go
func TestAddTask(t *testing.T) {
	task := "test task number 1"

	dir, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}

	cmdPath := filepath.Join(dir, binaryName)

	t.Run("AddNewTask", func(t *testing.T) {
		cmd := exec.Command(cmdPath, "-add", task)

		if err := cmd.Run(); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("ListTasks", func(t *testing.T) {
		cmd := exec.Command(cmdPath, "-list")
		out, err := cmd.CombinedOutput()
		if err != nil {
			t.Fatal(err)
		}

    // add this line
		out = []byte(strings.TrimSuffix(string(out), " \n\n"))

		expected := fmt.Sprintf("[ ] 1: %s", task)

		if strings.Compare(string(out), expected) != 0 {
			t.Errorf("got %v, expected %v\n", out, []byte(expected))
		}
	})
}
~~~

The `strings` package has a `TrimSuffix` function that is useful for trimming bits off the end of a string. In the code above, you can see that we added `out = []byte(strings.TrimSuffix(string(out), " \n\n"))`, which will trim off the space (character 32) and the two new lines (character 10). Now when we run our integration test, it passes:

~~~sh
ryan:todo/  |main U:4 ?:1 ✗|$ go test -v
Building tool...
using /tmp/.testtodo.json
running...
=== RUN   TestAddTask
=== RUN   TestAddTask/AddNewTask
=== RUN   TestAddTask/ListTasks
--- PASS: TestAddTask (0.00s)
    --- PASS: TestAddTask/AddNewTask (0.00s)
    --- PASS: TestAddTask/ListTasks (0.00s)
PASS
cleaning up...
ok      github.com/rnemeth90/todo/cmd/todo      0.106s

~~~