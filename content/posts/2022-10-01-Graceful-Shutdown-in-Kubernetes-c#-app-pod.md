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

~~~dockerfile
RUN reg add hklm\system\currentcontrolset\control /v WaitToKillServiceTimeout /t REG_SZ /d 60000 /f
~~~

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