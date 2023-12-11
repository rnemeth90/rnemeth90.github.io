---
title: 'Nginx Ingress Response Header Size - A Cautionary Tale'
author: Ryan
date: '2023-12-11'
layout: post
draft: true
categories:
    - nginx
tags:
    - kubernetes
    - nginx-ingress
    - linux
---

This will be a short post about a recent issue I encountered when using Nginx as a Kubernetes ingress. Though, this could also be encountered when using Nginx as a reverse proxy as well. The two definitions are functionally similar. 

We recently had a client call in complaining of our application returning random 502s (Bad Gateway). 

After some investigation and the common finger-pointing, I found this entry in the logs of our ingress controllers:

*note* this log entry is truncated 
```
[error] 193#193: 
    *25 upstream sent too big header while reading response header from upstream
```

This error message pointed towards a limitation in Nginx's default configuration - it struggles with large headers. This is a known quirk of Nginx, contrasting with some other web servers that can handle larger headers by default.

We later found that this client's large HTTP headers were due to a large content security policy header.

The solution seemed straightforward: increase the buffer size in Nginx to accommodate larger headers. For a typical Nginx setup, this could be achieved by tweaking the configuration file:
```
proxy_buffers 8 16k;  # 8 buffers of 16k each
proxy_buffer_size 16k; # 16k for headers
```

However, the situation gets a bit more complex when dealing with Nginx as an ingress controller in a Kubernetes environment.

### Configuring Nginx Ingress controller
Fortunately, the Nginx Ingress controller is designed to cater to such customizations. It allows configuration changes through a Kubernetes ConfigMap, which maps to Nginx's internal settings. To adjust the buffer size, you need to:

1) Deploy a ConfigMap with your desired settings, or add entries to an existing ConfigMap. For example, setting proxy-buffer-size to "16k" to handle larger headers:
```
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: kube-system
data:
  proxy-buffer-size: "16k"
```

If creating a new ConfigMap, you will need to tell Nginx pods to read it. This involves passing the name of your ConfigMap as an argument in your deployment configuration:
```
args:
  - /nginx-ingress-controller
  - --configmap=$(POD_NAMESPACE)/nginx-configuration

```

Once the ConfigMap is in place, the Nginx pods will pickup and apply the new settings

