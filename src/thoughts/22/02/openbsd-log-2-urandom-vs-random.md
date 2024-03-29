---
title: "OpenBSD Log 2: Urandom vs Random"
description: "Which is better, Urandom or Random?"
date: 2022-02-20T23:05:00-07:00
tags:
  - "thought"
  - "openbsd"
  - "urandom"
  - "random"
  - "source"
---

This week in OpenBSD been fairly monumental. I've realized that running OpenBSD on -current means a couple of things: first, I don't have to change my workflow from Archlinux to OpenBSD. I've been brainwashed by Arch to believe that rolling-release operating systems are more manageable and it's difficult to switch back. Luckily, -current means that updates are rolled out as soon as they are committed to the source tree, meaning I get bug fixes and the latest features of my favorite products. I don't ever plan on switching back to a release-based system like Windows where Windows 11 users have to wait another five years for the next release. And they're forcing their users to upgrade their CPUs with an architecture limit.

[https://docs.microsoft.com/en-us/windows-hardware/design/minimum/supported/windows-11-supported-intel-processors](https://docs.microsoft.com/en-us/windows-hardware/design/minimum/supported/windows-11-supported-intel-processors)

## Following -current snapshots in source

It's straightforward following -current if you carefully read the official FAQ.

1. Fetch latest snapshot:

```sh
sysupgrade -s
```

2. Ensure your user has write access to the /usr/src directory. I can't stress enough how awesome it is that OpenBSD actually uses groups to separate privilege concerns. That's a pattern Linux distros will never follow.

```sh
usermod -G wsrc USERNAME
```

You need to log out for the changes to register. You can always use `id` to double check.

3. Download the source code. Be prepared: it can take a really long time depending on your internet connection (upwards of a few hours). OpenBSD uses AnonCVS which (1) ensures consistency with a single source of truth and (2) allows anonymity when checking out. I chose the first server I saw in the list - probably why it took ages for me to checkout.

```sh
cd /usr
cvs -qd anoncvs@anoncvs.ca.openbsd.org:/cvs checkout -P src
```

4. To update the source:

```sh
cd /usr/src
cvs -q up -Pd -A
```

## Urandom vs Random

Which is more secure, /dev/urandom or /dev/random? And does it even matter?

The short answer is that /dev/urandom is more cyptographically secure. All client-side password generators (pwgen, openssl, /dev/random and any password generator) are userland PRNGs (pseudorandom number generators), meaning that they run on their own seed. This is a huge problem for threaded programs because two (distant) forks could potentially use the same seed and return the same pseudorandom value. Consider this illustration:

```
pwgen
(PID = 2) seed = 12345678 (supposed unique value)

pwgen (fork)
(PID = 2) seed = 12345678 (supposed unique value)

pwgen (fork) (fork)
(PID = 2) seed = 12345678 (supposed unique value)
```

I noticed this in my work. While using pwgen to generate passwords, I noticed I was receiving a lot of vaguely similar passwords with repetitive sequences of characters I had seen all too many times. The problem with a userland PRNG is that none of them can assure that state is different between applications. This implies that userland PRNGS have the possibility to not be "truly random". Here is a great blog post covering the exact issue with LibreSSL:

[https://www.agwa.name/blog/post/libressls_prng_is_unsafe_on_linux](https://www.agwa.name/blog/post/libressls_prng_is_unsafe_on_linux)

The reason /dev/urandom is better when /dev/random is because it is a kernelspace PRNG. This means it:

* has access to device entropy (randomness via hardware changes such as variations in fan speed, random writes to hard drives, linking)
* can ensure different state between applications

If that's not incentive enough to use it, here's a shell password generator to replace pwgen that will work on any unix operating system:

```sh
tr -dc "[:alnum:]" < /dev/urandom | fold -w 50 | head -n 25 | sed 's/.\{10\}/& /g'
```

## CPU overload

I've noticed recently that when my laptop battery gets low, my browser has the ability to cause a total system shutdown if I'm not careful. After a bit of testing, it seems to be caused by an abnormally excessive drain in battery power originating from some CPU-intensive task such as reloading 10 tabs at once in Firefox. I've narrowed it down to this since performing intensive tasks with AC power plugged in doesn't have the same effect, and other less CPU-intensive browsers (such as Chrome) don't cause the failure. I'm not really sure if this is a bug or a system-protective feature. Regardless, it looks like I need to do some more testing. In the famous words of Ted Unangst:

> The first thing you can try doing is running OpenBSD. There are many reasons to pick OpenBSD, but hopefully I've given you one more. Software that works on OpenBSD tends to work elsewhere.
> The reverse is not always true, and unfortunately I think this affects OpenBSD's reputation negatively. "Hey, this program crashes when I run it on OpenBSD. OpenBSD sucks." I beg to differ. More likely that it's the program that sucks. Just because a program doesn't always crash doesn't mean it can't be induced to crash.

[https://www.openbsd.org/papers/dev-sw-hostile-env.html](https://www.openbsd.org/papers/dev-sw-hostile-env.html)
