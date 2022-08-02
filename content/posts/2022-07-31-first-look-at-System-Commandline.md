---
title: 'A First Look at the System.CommandLine Library in Dotnet'
author: Ryan
date: '2022-07-31'
layout: post
draft: true
categories:
    - 'Software Development'
    - C#
tags:
    - c#
    - Dev
    - Programming
    - Software
    - dotnet
---

Let's first take a look at the progression of processing cmd line arguments in a c# console app.

To get started, create a new console application:
~~~Powershell
dotnet add package System.CommandLine --prerelease
New-Item -Type Directory -Path c:\temp && Set-Location -Path c:\temp && dotnet new console --framework net6.0
~~~

Now, open program.cs in VSCode and replace the contents with:
~~~c#
using static System.Console;

class Program
{
  static void Main(string[] args)
  {
    WriteLine("Hello World!");
  }
}
~~~

Output:
~~~Powershell
[15:34:52] C:\..\consoleapp on ❯  .\bin\Debug\net6.0\consoleapp.exe
Hello World!
~~~

If this code seems simple, that's because it is! All we are doing is printing "Hello World" to the console.
Nothing special about it. What if we wanted our program to print something else? Maybe something we specify
at runtime. For that, we could simply do something like this:
~~~c#
using static System.Console;

class Program
{
  static void Main(string[] args)
  {
    WriteLine($"{(args.Length > 0 ? args[0] : "Hello World")}!");
  }
}
~~~

With this program, we are printing "Hello World!" if an argument is not passed to the program.

Now when we run out program, we get the same output:
~~~Powershell
[15:36:18] C:\..\consoleapp on ❯  .\bin\Debug\net6.0\consoleapp.exe
Hello World!
~~~

However, we can also specify our own string to process:
~~~Powershell
[15:38:03] C:\..\consoleapp on ❯  .\bin\Debug\net6.0\consoleapp.exe "A fool and his money are soon parted"
A fool and his money are soon parted!
~~~

Pretty cool, right!?

This works fine for simple applications. But when you want your application to support multiple arguments, and maybe some
options for those arguments, your code may get complicated and end up looking like a bowl of speghetti!

Also, how would someone know they are able to pass arguments to your console app? For that, we would need a help system.
Most applications will print out some kind of help if you pass "/h", "/help", "--help", etc. Writing the code for this
also takes time and muddies up our application.

This is the reason that the dotnet team has introduced System.CommandLine (aka DragonFruit). You can spend time focusing
on the logic of your application, rather than help systems and parsing commandline arguments and options.

Use of the library also benefits the users of your application. It ensures that command-line input is parsed consistently
according to POSIX or Windows conventions. It also automatically supports tab completion and response files.

Let's now now dive a simple example using System.CommandLine.

First, we'll need to install the Nuget package. To do that, run this command:
~~~Powershell
dotnet add package System.CommandLine --prerelease
~~~

Now, replace the contents of program.cs with this:

~~~c#
using static System.Console;
using System.CommandLine;

class Program
{
  static void Main(string[] args)
  {

  }
}
~~~

The above code gives us a clean slate to start with. From here, we'll begin build a simple program
that will take advantage of the System.CommandLine package. Let's first recreate the behavior from our
first example above.

Every console application in existence has a 'root command'. This is the executable itself. So, for example,
if you use the the ping utility like this:

~~~shell
ping 8.8.8.8
~~~

'ping' is the root command.

To define the root command for our application using the System.CommandLine package, we simply add two lines:

~~~c#
using static System.Console;
using System.CommandLine;

class Program
{****
    static void Main(string[] args)
    {
        var rootCommand = new RootCommand("My App");

        rootCommand.Invoke(args);
    }
}
~~~

We first define a rootCommand variable, storing a RootCommand object. A description goes in the parentheses.

~~~c#
        var rootCommand = new RootCommand("My App");
~~~

Then, we invoke rootCommand. Invoke is an extension method that runs the command in question.

https://docs.microsoft.com/en-us/dotnet/api/system.commandline.commandextensions.invoke#system-commandline-commandextensions-invoke(system-commandline-command-system-string-system-commandline-iconsole)