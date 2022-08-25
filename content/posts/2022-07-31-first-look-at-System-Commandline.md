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
A fool and his money are soon parted
~~~

Pretty cool, right!?

This works fine for simple applications. But when you want your application to support multiple arguments, and maybe some
options for those arguments, your code may get complicated and end up looking like a bowl of spaghetti!

Also, how would someone know they are able to pass arguments to your console app? For that, we would need a help system.
Most (properly designed) applications will print out some kind of help if you pass "/h", "/help", "--help", etc. Writing
the code for this also takes time and muddies up our application.

This is the reason that the dotnet team has introduced System.CommandLine (aka DragonFruit). You can spend time focusing
on the logic of your application, rather than help systems and parsing commandline arguments and options.

Use of the library also benefits the users of your application. It ensures that command-line input is parsed consistently
according to POSIX or Windows conventions. It also automatically supports tab completion and response files.

Let's now dive into a simple example using System.CommandLine.

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

The above code gives us a clean slate to start with. From here, we'll begin building a simple program
that will take advantage of the System.CommandLine package. Let's first recreate the behavior from our
simple example above.

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
        var rootCommand = new RootCommand("The description of the app goes here!");

        rootCommand.Invoke(args);
    }
}
~~~

We first define a rootCommand variable, storing a RootCommand object. A description goes in the parentheses:

Then, we invoke rootCommand. Invoke is an extension method that runs the command in question. You can read the low level details here: [Invoke()](https://docs.microsoft.com/en-us/dotnet/api/system.commandline.commandextensions.invoke#system-commandline-commandextensions-invoke(system-commandline-command-system-string-system-commandline-iconsole)********)

Let's run the application and see what happens:

~~~shell
[14:12:38]   C:\..\..\..\..\net6.0 on ❯  .\consoleapp.exe

[14:14:34]   C:\..\..\..\..\net6.0 on ❯
~~~

We got no output, so let's pass a '-h' flag to see if we can get some help.

~~~shell
[14:14:34]   C:\..\..\..\..\net6.0 on ❯  .\consoleapp.exe -h
Description:
  The description of the app goes here!

Usage:
  consoleapp [options]

Options:
  --version       Show version information
  -?, -h, --help  Show help and usage information

~~~

Now we're getting somewhere! You can see the rootCommand provides 2 options by default. We've already seen what '-h' can do (notice its variations).
Version will obviously output the version of the app.

Let's take a look at how we can add our own options. Replace the code in your class with the following:
~~~c#
using static System.Console;
using System.CommandLine;

class Program
{
    static void Main(string[] args)
    {
        var nameOption = new Option<string?>(
                                    name: "--name",
                                    description: "Pass in a name");

        var rootCommand = new RootCommand("The description of the app goes here!");
        rootCommand.Add(nameOption);

        rootCommand.SetHandler((nameOptionValue) =>
        {
            SayHello(nameOptionValue);
        }, nameOption);


        rootCommand.Invoke(args);
    }

    internal static void SayHello(string? name)
    {
        WriteLine($"Hello {name}");
    }
}
~~~

Now, compile and run the exe again with the -h option to see what our app is now capable of.

~~~shell
[14:24:33]   C:\..\..\..\..\net6.0 on ❯  .\consoleapp.exe -h
Description:
  The description of the app goes here!

Usage:
  consoleapp [options]

Options:
  --name <name>   Pass in a name
  --version       Show version information
  -?, -h, --help  Show help and usage information

~~~

We now have a --name argument that accepts a parameter. Let's see what that does.

~~~shell
[14:25:37]   C:\..\..\..\..\net6.0 on ❯  .\consoleapp.exe --name ryan
Hello ryan
~~~

Nifty.