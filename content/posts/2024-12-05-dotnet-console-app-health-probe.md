---
title: 'Kubernetes Health Probing in Dotnet Console Apps'
author: Ryan
date: '2024-12-05'
layout: post
draft: true
categories:
  - Kubernetes
tags:
  - devops
  - software development
  - dotnet
  - sre
---

# Introduction

This post covers a simple and efficient solution for implementing liveness probes in pods running console applications (think background services or utility DaemonSets). A common question in Kubernetes forums is:

    “How do I use health probes with console apps?”

The typical responses often suggest: 1. Sidecar Container with HTTP Server: Requires coding the server, building a sidecar container, and managing additional infrastructure. While effective, this can be overkill for lightweight applications. 2. Exec Probes with Shell Scripts: Feels hacky and can waste resources, depending on what the script does.

Pods are meant to be lightweight, and both solutions can deviate from that principle.

Instead, we’ll use a simple TCP listener to create an efficient liveness probe. Here’s the code:

```
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

class Program
{
    static void Main(string[] args)
    {
        int port = 6379; // You can run this on a different port if necessary

        Thread tcpServerThread = new Thread(() => StartTcpServer(port));
        tcpServerThread.IsBackground = true;
        tcpServerThread.Start();

        Console.WriteLine("Application is running...");
        while (true)
        {
            // do some work
            Thread.Sleep(1000);
        }
    }

    static void StartTcpServer(int port)
    {
        TcpListener server = null;

        try
        {
            server = new TcpListener(IPAddress.Any, port);
            server.Start();
            Console.WriteLine($"Liveness server started on port {port}.");

            while (true)
            {
                TcpClient client = server.AcceptTcpClient();
                NetworkStream stream = client.GetStream();

                byte[] buffer = new byte[256];
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                string request = Encoding.ASCII.GetString(buffer, 0, bytesRead).Trim();

                if (request.Equals("ping", StringComparison.OrdinalIgnoreCase))
                {
                    byte[] response = Encoding.ASCII.GetBytes("pong\n");
                    stream.Write(response, 0, response.Length);
                }

                client.Close();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in liveness server: {ex.Message}");
        }
        finally
        {
            server?.Stop();
        }
    }
}
```

You can learn more about health probes here: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
