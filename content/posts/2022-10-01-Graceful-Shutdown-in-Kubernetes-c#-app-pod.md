---
title: 'Handling Graceful Shutdown in a .NET App Hosted in Kubernetes'
author: Ryan
date: '2022-12-28'
layout: post
draft: false
categories:
    - 'Software Development'
    - SRE
    - Kubernetes
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
As stated, these APIs are hosted in Kubernetes. They are written primarily in c# (.NET Framework) and hosted in Windows Server Core containers. The pods are load balanced using a service, and we have an Nginx ingress on top of the service. Nothing fancy, just a typical setup that you may have seen or even built yourself. We implement automatic scaling for our replica sets using a standard Kubernetes-native HPA or Keda, depending on the app. We have autoscale rules defined for the pods. Our clusters are hosted in Azure Kubernetes Service, and we autoscale our node pools. So, there are several layers of scaling happening in our clusters at any given time. Occasionally, when a pod was handling a client request, Kubelet or a controller would come along and scale the pod in. We were initially under the belief that the `terminationGracePeriodSeconds` value within our deployment would allow the pod to continue running for the defined number of seconds. However, we were mistaken. This value tells Kubernetes to allow the application running within the pod some time to clean up. It does *not* tell the app to continue running for the defined number of seconds after it receives a sigterm signal. This logic actually needs to be implemented within the application itself, or with a prestop hook. The prestop method is [well documented](https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/), so I will not cover it here.

To implement this in a .NET Framework app running in Windows, you need to add this registry key to your container.
~~~dockerfile
RUN reg add hklm\system\currentcontrolset\control /v WaitToKillServiceTimeout /t REG_SZ /d 60000 /f
~~~
This value tells Windows to wait a number of milliseconds before shutting down Normally, Windows only waits for 5 seconds (default) before shutting down any 'background' processes. Windows forcibly shuts down processes after this period of time.

Next, in the startup class, we'll add the following code. I have added inline comments to explain.
~~~c#

namespace MyApp.APIConsoleHost
{
	public class Program
	{
    /*
      Register the SetConsoleCtrlHandler function in kernel32.dll in the
      application to capture CTRL_SHUTDOWN_EVENT events for resource reclamation
    */
		[DllImport("Kernel32")]
		public static extern bool SetConsoleCtrlHandler(HandlerRoutine handler, bool add);

    // Define a delegate for our handler routine
		public delegate bool HandlerRoutine(CtrlTypes ctrlType);

		public static volatile ManualResetEvent _exitEvent = new ManualResetEvent(false);

		private static HandlerRoutine _handler;


    /*
      Define the event types that we want to handle when the application receives a SIGTERM
          CTRL_C_EVENT = 0,
          CTRL_BREAK_EVENT = 1,
          CTRL_CLOSE_EVENT = 2,
          CTRL_LOGOFF_EVENT = 5,
          CTRL_SHUTDOWN_EVENT = 6
    */
		public enum CtrlTypes
		{
			CTRL_SHUTDOWN_EVENT = 6
		}

    /*
        Here we are defining how we want to handle the shutdown
        We get a timeout value from an env variable named APP_SHUTDOWN_TIMEOUT
        If that env variable is not found, we default to 60 seconds.
        We then switch on our CtrlTypes enum and handle each value accordingly,
        and then return true.
    */
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

    /*
        Our main method is pretty standard. However, we first register a new handler (_handler),
        and then pass it to to the SetConsoleCtrlHandler() method we imported from Kernel32.dll.
        The only other 'unique' thing is the _exitEvent.WaitOne(); call defined at the bottom of main().
        This is necessary so that main does not immediately exit, and wait's for a signal. We defined a
        property for this _exitEvent of type ManualResetEvent at the top of this class file.
    */
		public static void Main(string[] args)
		{
			_handler += new HandlerRoutine(ConsoleCtrlCheck);
			SetConsoleCtrlHandler(_handler, true);

      // redacted ....

			var startOptions = BuildStartOptions();

      // redacted ....

      WebApp.Start<SelfHostStartup>(startOptions);

			Console.WriteLine("Press CTRL+C to stop it");

			_exitEvent.WaitOne();
		}

		private static StartOptions BuildStartOptions()
		{
			var startOptions = new StartOptions();

      // redacted start options

			return startOptions;
		}
	}
}
~~~


To prevent the HandlerRoutine instance from being recycled before the program exits, the HandlerRoutine of static is used in the above example. This is important because if the handlerroutine is recycled before the application is finished, it will throw an error, as shown in the following code:
~~~
A callback was made on a garbage collected delegate of type 'Program+HandlerRoutine::Invoke'. This may cause application crashes, corruption and data loss. When passing delegates to unmanaged code, they must be kept alive by the managed application until it is guaranteed that they will never be called.
~~~