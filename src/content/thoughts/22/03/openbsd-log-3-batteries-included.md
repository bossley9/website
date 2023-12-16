---
title: "OpenBSD Log 3: Batteries Included"
description: "My battery woes in addition to personal server setup and moving away from Microsoft."
date: 2022-03-12T11:56:00-07:00
tags:
  - "thought"
  - "openbsd"
  - "battery"
  - "microsoft"
  - "git"
  - "ram"
---

The most valuable aspect of running OpenBSD is the learning process. I learn more from running OpenBSD as a daily driver than I ever will from my full time job. This week I've removed my heavy dependence on Microsoft, switched to run Firefox directly from ramdisk, and (finally) fixed my system crashing issues.

## Dependence on Microsoft

In the past, I have heavily depended on Microsoft to store my personal data. I've been using Github as a personal file silo, storing all sensitive files into a private git repository. The reason I chose a git repository was for two reasons: history and syncing. Because I regularly use multiple devices (phone, laptop, work laptop, and desktop), I need a system that allows me to sync files across all devices. Dropbox or Google One are popular alternatives but are both proprietary. In addition, I needed some form of snapshotting or history so I opted to use git commits as a method of traversing file history. Even before Microsoft bought Github, I have hated every second of ambiguous file storage on Github because Github is inherently proprietary and have been searching for the "best" solution for a long time.

I've finally made a resolution and switched to a privately-hosted OpenBSD VPS to host an SSH key-based git daemon. The main reason SSH-based authentication is so fantastic is that it's device specific - it can't be hacked via username and password, unlike Github. It's also a great way for me to host other personal services such as Miniflux, Nextcloud, or my CGI feed generator (in the making).

[https://miniflux.app](https://miniflux.app)

[https://nextcloud.com](https://nextcloud.com)

[https://github.com/bossley9/feedme](https://github.com/bossley9/feedme)

The best part of hosting a VPS is that I own it. I can do whatever I want with it and no one can spy on me. Goodbye, Microsoft.

## Running Firefox directly from ramdisk

I love setting up ramdisk partitions on my BSD and Linux machines because they make your browser and system ever-so-slightly more responsive. Good luck trying to run Firefox directly from ram in Windows or MacOS.

There are two steps: (1) setting /tmp as a memory partition and (2) pointing Firefox to use /tmp as a cache.

I think most Linux distros now use /tmp as a tmpfs partition by default. Setting up /tmp as a memory partition is relatively simple in OpenBSD. First, edit your fstab to use mfs instead of ffs:

```
# 59d75b66a582299a.d /tmp ffs rw,softdep,noatime,nodev,nosuid 1 2
swap /tmp mfs rw,nodev,nosuid,noatime,async,-s=2048m 0 0
```

Reboot the system and login as root. It's better to do this in a virtual console rather than a graphical terminal. We now need to set the permissions of the partition to 1777 (sticky bit) so that any user can access the partition.

```sh
$ umount -f /tmp
$ chmod 1777 /tmp
$ mount /tmp
$ reboot
```

On a successful reboot, /tmp should be running from ramdisk:

```sh
$ ls -l /
  drwxrwxrwxt 6 root wheel 512 Mar 6 10:39 tmp
$ df -h
  mfs:29907 1.9G 475K 1.8G 0% /tmp
```

All that's left is configuring Firefox. Go to about:config in the browser and set the following properties:

```
browser.cache.disk.parent_directory = /tmp/firefox
browser.cache.memory.enable = true
browser.cache.disk.enable = false
```

You're all set! Try restarting Firefox and see if it's noticeably faster.

## Batteries Included

I've finally fixed my system shutdown issues! I have been testing and monitoring my cpu and power settings the past two weeks and wrote a simple shell script to track metrics when my system crashes to get a better understanding of what might have been the culprit.

```sh
logFile="..."

datetime() {
  date +"%y-%m-%d %H:%M:%S"
}

prevStatus=""
while true; do
  bat=$(apm -l)
  [ $(apm -a) -eq 1 ] && ac="c" || ac="d"
  temp=$(sysctl hw.sensors.cpu0.temp0 | cut -d"=" -f2)
  volt=$(sysctl hw.sensors.acpibat0.volt1 | cut -d"=" -f2 | cut -d" " -f1)
  clock=$(sysctl hw.cpuspeed | cut -d"=" -f2)
  status="${bat}% ${ac} ${temp} ${volt}V ${clock}Hz"

  [ "$prevStatus" != "$status" ] && echo "$(datetime) $status" >> $logFile
  prevStatus=$status

  sleep 1
done
```

Not exactly elegant but it gets the job done. Every second it aggregates a few system metrics and writes it to a log file if any changes took place. I began stress testing my system but never saw anything out of the ordinary.

```
22-02-24 18:02:37 54% d 40.00 degC 6.97V 400Hz
(system crash)
22-02-25 16:37:28 43% d 32.00 degC 7.19V 400Hz
22-02-25 16:37:31 43% d 34.00 degC 7.19V 2801Hz
22-02-25 16:37:52 43% d 32.00 degC 7.20V 400Hz
(system crash)
22-02-25 17:19:13 32% c 49.00 degC 8.15V 2801Hz
22-02-25 17:19:18 32% c 47.00 degC 8.16V 2801Hz
22-02-25 17:19:28 32% c 45.00 degC 8.17V 2801Hz
22-02-25 17:19:31 32% d 45.00 degC 8.17V 400Hz
22-02-25 17:19:53 32% c 40.00 degC 8.15V 2801Hz
22-02-25 17:21:53 34% c 39.00 degC 8.19V 2801Hz
22-02-25 17:21:58 34% c 40.00 degC 8.19V 2801Hz
22-02-25 17:22:03 34% c 39.00 degC 8.19V 2801Hz
(system crash)
```

At this point, I decided to ask the OpenBSD devs for help. They promptly responded with this:

> "Your battery is old and weak. That large spike in CPU usage draws more power than your battery can supply at those levels, and so the system shuts off. It's possible that other programs ramp up more slowly on the power usage or manage a different blend of usage.
> There's nothing wrong with [using an old laptop]. Until my new job bought me a new thinkpad, I used an Ivy Bridge based HP Probook. I did replace the battery though. :)"

Throughout my testing, I never considered a hardware issue to be the problem. I realized it would make sense for my six year old laptop hardware to be causing issues and purchased a brand new laptop battery. The installation of laptop batteries is fairly simple and I was back up and running in less than 30 minutes.

Since my battery replacement five days ago I have not encountered a single shutdown.

I also learned a bit about battery life and expectancy in the process. A battery needs to be properly maintained and regulated in order for it to live a long life. Battery capacity should almost always be kept between 50-90% and should never fall below 50% because it weakens the battery. Think of a battery as a human being: You should never allow your health to fall below 50% capacity or you will start to encounter serious health issues.

A healthy battery makes for a happy user!
