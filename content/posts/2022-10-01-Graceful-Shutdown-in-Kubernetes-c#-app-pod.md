---
title: 'Handling Graceful Shutdown in a .NET App Hosted in Kubernetes'
author: Ryan
date: '2022-10-01'
layout: post
draft: true
categories:
    - 'Software Development'
    - SRE
    - dotnet
    - c#
    - Kubernetes
    - Devops
tags:
    - 'Software Development'
    - SRE
    - dotnet
    - c#
    - Kubernetes
    - Devops
---

I was recently involved with troubleshooting some API's hosted in Kubernetes throwing http/502's. This was incredibly difficult to diagnose because it seemingly happened at random, and I had never encountered anything like this. Being that I had never dealt with this in the past, and I (nor my team) was able to figure it out within a reasonable amount of time, I turned to google. My searches resulted in various blogs and SO posts of other people experiencing similar issues, but none of their resolutions worked for us. It was actually a combination of these blogs (and the resolutions posted) that ended up resolving our issue.

### So what was actually causing the 502's?
As stated, these APIs are hosted in Kubernetes. They are written primarily in c# (.NET Framework) and hosted in Windows Server Core containers. The pods are load balanced using a service, and we have an Nginx ingress on top of the service. Nothing fancy, just a typical setup that you may have seen or even built yourself. We implement automatic scaling for our replica sets using a standard Kubernetes-native HPA or Keda, depending on the app. We have autoscale rules defined for the pods. Our clusters are hosted in Azure Kubernetes Service, and we autoscale our node pools. So, there are several layers of scaling happening in our clusters at any given time. Occasionally, when a pod was handling a client request, Kubelet or a controller would come along and scale the pod in. We were initially under the belief that the terminationGracePeriodSeconds value within our deployment would allow the pod to continue running for the defined number of seconds. However, we were mistaken. This value tells Kubernetes to allow the application running within the pod some time to clean up. It does *not* tell the app to continue running for the defined number of seconds after it receives a sigterm signal. This logic actually needs to be implemented within the application itself, or with a prestop hook. The prestop method is [well documented](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/), so I will not cover it here.

To implement this in a c# app, you need to add this registry key to your container. This value tells Windows to wait a number of milliseconds before shutting down. Normally, Windows only waits for 5 seconds before shutting down any 'background' processes. Windows forcibly shuts down processes after this period of time.

This can be done in the dockerfile:
~~~dockerfile
RUN reg add hklm\system\currentcontrolset\control /v WaitToKillServiceTimeout /t REG_SZ /d 60000 /f
~~~

Next, in the startup class, we'll add the following code. I have added inline comments to explain.

~~~c#

namespace MarketingOps.APIConsoleHost
{
	public class Program
	{
		[DllImport("Kernel32")]
		public static extern bool SetConsoleCtrlHandler(HandlerRoutine handler, bool add);

		public delegate bool HandlerRoutine(CtrlTypes ctrlType);

		public static volatile ManualResetEvent _exitEvent = new ManualResetEvent(false);

		private static HandlerRoutine _handler;

		public enum CtrlTypes
		{
			CTRL_SHUTDOWN_EVENT = 6
		}

		public static bool ConsoleCtrlCheck(CtrlTypes ctrlType)
		{
			var timeout = ConfigurationManager.AppSettings["APP_SHUTDOWN_TIMEOUT"];
			if (string.IsNullOrEmpty(timeout)) { timeout = "60"; }
			int counter = int.Parse(timeout);

			switch (ctrlType)
			{
				case CtrlTypes.CTRL_SHUTDOWN_EVENT:
					Console.WriteLine($"[{DateTime.UtcNow}] CTRL_SHUTDOWN received");
					Console.WriteLine($"[{DateTime.UtcNow}] Web Server is stopping in {counter} seconds");

					while (counter > 0)
					{
						Thread.Sleep(TimeSpan.FromSeconds(1));
						counter--;
					}

					_exitEvent.Set();
					return true;
				default:
					return false;
			}
		}

		public static void Main(string[] args)
		{
			_handler += new HandlerRoutine(ConsoleCtrlCheck);
			SetConsoleCtrlHandler(_handler, true);

			if (args.Length >= 1)
			{
				if (args[0].Equals("debug", StringComparison.OrdinalIgnoreCase))
				{
					Console.WriteLine("Detected 'debug' argument so pausing here. Attach debugger and hit 'return' to continue.");
					Console.ReadLine();
				}
			}

			var startOptions = BuildStartOptions();
			Console.WriteLine($"[{DateTime.UtcNow}] Web Server starting on {string.Join(";", startOptions.Urls)}");

			WebApp.Start<SelfHostStartup>(startOptions);
			Console.WriteLine($"[{DateTime.UtcNow}] Web Server started");

			Console.WriteLine("Press CTRL+C to stop it");

			_exitEvent.WaitOne();
		}

		private static StartOptions BuildStartOptions()
		{
			var startOptions = new StartOptions();

			var owinUrls = ConfigurationManager.AppSettings["OWIN_URLS"];
			if (string.IsNullOrEmpty(owinUrls))
			{
				owinUrls = "http://127.0.0.1:8501/";
			}

			foreach (var url in owinUrls.Split(';'))
			{
				startOptions.Urls.Add(url);
			}

			return startOptions;
		}
	}
}

~~~