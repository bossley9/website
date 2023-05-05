---
title: "sshfs vs scp vs sftp vs rsync"
description: "While transferring large quantities of files across machines, I've decided to do a bit of research into which solution provides the best performance and user experience."
date: 2023-05-04T20:56:00-07:00
tags:
  - "tech"
  - "sshfs"
  - "scp"
  - "sftp"
  - "rsync"
  - "performance"
  - "unix"
---

## Intro

I've been migrating all of my large media files from various Google facets into my own personal ZFS hard disks and ran into performance issues when transferring files across remote machines. I had been using `sshfs` for convenience when transferring small individual files, but when files became tens of Gigabytes of data, throughput slowed to a painful crawl. At that point I decided to do a bit of research and experimentation to find a solution: what's the most efficient way to transfer large files across remote machines?

## The Candidates

Here are the candidates I tested:

**SSH file system (sshfs)** is a filesystem client using SSH under the hood to mount remote drives. It's like plugging in a flash drive. Except that flash drive is an entire computer and could live across the world.

**Secure Copy (scp)** is a program which uses SFTP to copy files between hosts. It's nearly identical to `cp` but works across machines.

**Secure File Transfer Program (sftp)** uses SHH to transfer files via an interactive shell.

**Remote sync (rsync)** is a tool primarily made for creating backups but can also be used for standard file transfers.

## Test 1: Performance

I put the raw performance of all these clients to the test by copying one 1.9G video file from my machine to a remote machine. I used the `time` utility to capture transfer speed.

```sh
# sshfs

@ sshfs user@host: ~/Mount
Enter PIN for ED25519-SK key /home/sam/.ssh/id_ed25519_sk:
@ time cp ./test.mp4 ~/Mount/
'./test.mp4' -> '~/Mount/test.mp4'
   11m37.39s real     0m00.03s user     0m00.90s system
@ umount ~/Mount

# scp

@ time scp ./test.mp4 user@host:
   11m32.41s real     0m04.98s user     0m03.05s system

# sftp

@ sftp user@host
sftp> put test.mp4
test.mp4             100% 1911MB  2.8MB/s  11:29
sftp> quit

# rsync

@ time rsync -vz --progress ./test.mp4 user@host:
   11m45.69s real     0m06.02s user     0m02.98s system
```

In my experience, `sftp` and `scp` tend to stay pretty close in performance, but I was pleasantly surprised to see `sshfs` keeping up. As expected, `rsync` lags a bit behind.

## Test 2: User Experience

For this test, I practiced moving multiple files and folders between machines. Of all of these options, sshfs and sftp take the lead. I usually avoid interactive shells but sftp's commands are very intuitive and easy to handle when quickly transferring files. In the same light, no learning curve is required with sshfs if you can already navigate pretty quickly around a unix filesystem.

Sftp and scp do a better job of automatically indicating file transfer progress. With sshfs and rsync, transferring large files means staring at an unchanging screen for a few minutes at a time.

Scp and rsync tie for last. They're adequate for automated one-way transfers such as [deploying a website](https://github.com/bossley9/website/blob/cbbff158b1a33b4a54288ab0120d707902783742/Makefile#L26) but fall short when any additional effort needs to be done.

## Conclusion

Here is the final ranking of all the candidates:

1. `sftp` is easily the most useful. The interactive session allows you to retry file transfers and move between remote and local directories efficiently. Unlike `sshfs`, you won't need to remember a really long file path to transfer files.
2. `sshfs` is the most convenient for browsing server files using local unix commands.
3. `scp` provides nice file progress and is supposedly slightly faster than sftp, although it's always taken about the same in all my transfers.
4. `rsync` falls last. I don't think I'll ever remember what each rsync flag means without looking them up every time. However, on a positive note, rsync can move files without copying.
