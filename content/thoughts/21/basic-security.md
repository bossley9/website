---
title: "Basic Security"
description: "Here are a few basic security tips you can follow to greatly increase the security of your online presence."
date: 2021-09-25T21:02:00-07:00
tags:
  - "recommendation"
  - "tech"
  - "security"
---

Today I'm going to impart on you a few basic security tips that you can take to greatly increase the security of your online presence. Security has become very important to me in the past year (mostly attributed to me tinkering with OpenBSD) and I'd like to share my knowledge with the world so that the internet can be a safer place.

## Basic Tips for Everyday Users

All of the tips I will mention in the next section are tips that anyone can adhere to on any device. They are fundamental, straightforward, and if followed, can reasonably prevent your devices from ever getting hacked.

### Regularly restart your devices.

Most regular-use devices (including phones, laptops, and handhelds) should be hard restarted every one or two days. The justification for this behaviour is that most active program data is stored or cached in what is known as "volatile memory" and can only be erased with a hard restart. Think of volatile memory like a box filled with program data. The longer applications are running, the more items are thrown in this box. The longer you go without shutting down your devices, the more cluttered and jumbled the box becomes. Why might this be an issue?

There are two vulnerabilities concerning volatile memory. First, programs might overwrite each other since all programs share the same space. Continuing the previous analogy, filling the box too full might cause the glass items at the bottom of the box to break. It's good practice to clear out memory and leave space for new programs.

The second and more likely vulnerability is the potential for sleeper scripts. Sleeper scripts are rogue malware scripts downloaded via internet sites, browser extensions, and random programs you run. Since volatile memory is shared by all programs, it's fairly trivial for a software virus to be planted alongside other program data awaiting execution. The scariest aspect of sleeper scripts is the very reason the scripts have earned their name: you may never even realize they're running until it's too late.

Here's a high level example of a malicious sleeper script:

```
in /tmp/steam.exe:

// bad things here!
run steal_your_data.exe
run delete_system_32.exe

// normal behaviour
run steam.exe
```

When a user attempts to open steam.exe, instead of opening the original application, it actually runs this sleeper script due to a naming conflict. The virus secretly steals your data without you knowing, then runs the actual steam.exe application you expected. From a user perspective, nothing malicious happened at all. In fact, by the time the user notices any abnormalities with their device, it's likely too late.

Sometimes the most straightforward solution is the best solution: restarting your devices every one or two days prevents volatile memory from becoming a problem.

### Use multi-factor authentication when possible.

Multi-factor authentication is one of the best ways to improve daily security with frequently used accounts and applications. Fortunately, most applications have begun to adopt some form of multi-factor authentication in the past year alone. Multi-factor authentication restricts access to content without proving access to a specific device. This form of authentication is strongly preferred over standard password authentication because it ensures physical device access. In the scary world of technology, the best way to maintain security is to abstract access permission into physical objects (which will be made more apparent in the following tips below). Because virtually all malicious online behaviour is performed remotely, your security is greatly enhanced by requiring physical access.

### Make your passwords longer, not harder.

When a hacker attempts to break into a device or account, they have two main approaches to guessing a password: rainbow tables and brute force. At a high level, a rainbow table is a pre-generated list of frequently used passwords for the purpose of inputting into a system one by one for password guessing. Think of it as similar to a password dictionary. The best defense against rainbow tables is some form of password complexity. Before creating a new password, check to make sure the password is not found in a rainbow table.

[https://en.wikipedia.org/wiki/List_of_the_most_common_passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords)

[https://en.wikipedia.org/wiki/Wikipedia:10,000_most_common_passwords](https://en.wikipedia.org/wiki/Wikipedia:10,000_most_common_passwords)

Assuming the password does not appear in a rainbow table, the next logical method to crack a password is enlisting brute force - in other words, trying every possible password combination imaginable. Brute force password guessing mechanisms, however, do not take password complexity into consideration. Instead, most brute force methods will try an approach similar to the one below:

```
a
b
c
...
aa
ab
ac
...
aaa
aab
aac
...
aaaa
aaab
aaac
```

In this scenario, the password "test-test-test-test" is exponentially more secure than "T3st12\*4!" because it will take more time to crack. The complexity of a password only protects your account against human access. The glaring issue is that most methods of password cracking are not human. To a malicious password-cracking program, "!$\*@" is the same password as "abcd".

This can be illustrated using the previous password examples. Following the assumption each password attempt takes 0.1 milliseconds (a fair approximation disregarding authentication timeouts and multi-factor authentication), the password "test-test-test-test" will take 2.1x10^18 times longer to guess than the password "T3st12\*4!". This goes to show that it is better to make passwords longer rather than harder.

### Write down your passwords.

Writing down a password seems like a prima facie anti-pattern; however, written passwords provide more benefit than password managers or password lockers. As mentioned previously, nearly all malicious online behaviour is performed remotely. This makes password management invaluable in physical form because it abstracts online data from online access (in fact, security professional Bruce Schneier endorses this method of password storage as well). If these papers are kept safe and secret in a wallet or safe, remote hackers have no chance of accessing personal information. If my mom can do it, so can you.

[Bruce Schneier on passwords](https://www.schneier.com/news/archives/2010/11/bruce_schneier_write.html)

A common mistake nearly all of my peers make is to store their passwords and secret information in their notes phone app. This is by far the worst security scheme imaginable. It is akin to using a password manager with a 4-digit primary password. Please do not do this. 

### Lock your device screens.

When leaving a device in a public space (even at a friend's residence or a welcoming environment), lock your screen before anything else. It is impossible to know who might be listening, shoulder spying, or glancing. This includes getting up briefly, talking to friends, and looking away from your screen. A good rule of thumb to follow is that if your hands are off the device or keyboard, the screen should be locked. 

### Use HTTPS only.

HTTPS is an objectively stronger internet security protocol than its predecessor HTTP due to its TLS handshake requirement. Using HTTP for internet browsing exposes your data connection with servers to anyone in your local network. Fortunately, this is not an issue in 2021 as nearly all websites use HTTPS by default.

To enforce using HTTPS only, many browsers have an "HTTPS-only mode" in their user preferences to enforce this security requirement.

In Firefox, navigate to "about:preferences#privacy" and select "Enable HTTPS-Only Mode in all windows".

[about:preferences#privacy](about:preferences#privacy)

In Chrome, navigate to "chrome://settings/security" and check "Always use secure connections".

[chrome://settings/security](chrome://settings/security)

### Think before you run.

Before running any application, consider the consequences. Why do I want to run this application? Do I trust its creators? What do I gain by running this application?

I find it necessary to reiterate blatant truths because I consistently hear stories from peers about a loved one getting hacked or getting their data stolen. Do not run arbitrary binaries or executables you do not trust. Do not install browser extensions of unverified creators. Finally, always be skeptical.

Last month my former roommate got hacked through Discord. They were sent a "game" executable via direct message from a friend and told that the executable was a game the friend was hoping to have someone test. Without thinking, my roommate opened the executable, running a malicious script to scrape Discord account information and steal account credentials.

Within minutes, the Discord account was locked out and the profile was changed. All of her friends were sent the exact same messages she had initially been sent. If she had stopped for a moment to consider the consequences of what might happen, the situation may have never occurred.

> I call myself the "former roommate of the developer of Mythical Islands" because her hacked account's profile bio was changed to the text below. We both think it's really funny.

```
She/Her.
23y old.
Coding for 4 years.
I like, Fox, IceCream, and water xD.
Developper of Mythical Islands.
```

## Advanced Tips for Power Users

All the tips in this next section are tips for advanced technical users. If you truly care about proactive security, follow these tips carefully.

### Sandbox your applications.

I cannot stress this enough. Today's monolithic browsers are a machine's greatest strength and greatest weakness. Browsers such as Chrome and Firefox have so much power over a user's device. They can access block devices, read SSH keys and passwords, and provide a gateway from the entire internet to your device. It's no surprise many users get hacked through malicious links or faulty browser extensions.

Sandboxing applications prevents rogue applications from going outside the bounds of their contracts. A "sandbox" is a virtual closed box environment isolated from the rest of your system. In a sandboxed environment, an application must abide by the rules of the environment. It's a good practice to sandbox any and every internet application you regularly use. A few examples of applications I sandbox on my Arch machine include Firefox, Discord, Spotify, Slack, and Figma. If sandboxing is a foreign concept to you, below are a few programs to help you get started.

[Firejail](https://firejail.wordpress.com)

[Apparmor](https://www.apparmor.net)

[Qemu](https://www.qemu.org)

> This goes without saying: if you're running an OpenBSD machine, no sandboxing is needed since OpenBSD's pledge and unveil libraries already provide a pseudo-sandboxed environment!

### Set your umask to 0077.

File permissions are the biggest offender in an insecure system. In many operating systems, the default file permissions allow your files to be read and written to by anyone. This is a security risk because a malicious user could write to a system essential library and cause irreversible damage (for example, deleting system 32 on Windows). Umask is a system utility on all (POSIX) operating systems that sets the default creation mask of new files. This means that any new files created on the system will adhere to the file permissions set by umask.

The NSA recommends setting the default umask of any system to 0077. Without going into too much detail, this permission mask means that the group and everyone bits will all be set to zero. Only the creator of the file will be able to read (r), write (w), or execute (x) its contents. Below is an example of a few files on my system that adhere to this umask. The dashes on the left symbolize file permissions.

```
$ ls -l
total 1400
-rw------- 1 user user  65232 Jan  5  2021 dxvk_versions.json
-rw------- 1 user user  65232 Jan  5  2021 dxvk_versions.json.1
-rw------- 1 user user 359284 Sep 25 15:38 guardian.pdf
-rw------- 1 user user 214730 Sep 24 16:40 loan.pdf
-rwx------ 1 user user    738 Sep 25 09:48 run.sh
-rw------- 1 user user    246 Sep 25 09:27 test
```

[NSA Security Configuration](https://apps.nsa.gov/iaarchive/library/ia-guidance/security-configuration/operating-systems/guide-to-the-secure-configuration-of-red-hat-enterprise.cfm)

If you run any Unix system with a POSIX-compliant shell, the default umask can be set in a profile or initialization script to ensure the umask will always be 0077.

```sh
# in /etc/profile:

umask 0077
```

### Use pubkey authentication when possible.

Secure Shell (SSH) is such a fantastic communication protocol due to its key-based communication system. Public key authentication allows for your device to communicate securely with a server, website, or application based on the device and not on a crackable password. Similar to multi-factor authentication, pubkey authentication ensures physical device access. While multi-factor authentication is focused on authentication with multiple devices, pubkey authentication uses a single device to authenticate without the need to remember passwords. Below is an example of using SSH to send a public key to a trusted server.

```sh
ssh-copy-id -i $HOME/.ssh/id_rsa user@my.server.ip
```

### Use signatures and checksums.

Signatures and checksums are both extremely useful methods of validating data from remote or unknown sources. When downloading a program from a website or receiving a direct message from a friend, it may be difficult to discern whether the data you received is accurate. What if my download is corrupted? What if the file I downloaded is actually a virus and not what the creator intended?

As indicated by its name, a signature is a digital imprint that uniquely identifies a person or device. Creators of programs or messages can sign their content using PGP signatures to give other people confidence that the files come from the right place. Spotify is a good example of an application that is signed with a PGP signature.

Similarly, checksums are computed binary messages that provide a hash summary of a file or program. When downloading a file, a user might also download a checksum corresponding to the file. When the file is downloaded, the user will compute the checksum of the downloaded file and compare it to the downloaded checksum. If the checksums match, the file is valid. Otherwise, the file may be corrupted or not what the original creator intended.

How can you compute a checksum? Below is a standard example using SHA256:

```sh
$ sha256sum test.txt
8d518b35c10a42230e0d04aa9f880e777e11339743f974eee23bad9c40c062ad  test.txt
```

## Hardcore Tips for the Paranoid

The following tips are not recommended for most users (I don't even follow all of these) but I thought I might include them purely for academic purposes. I don't believe any of these tips are necessary or applicable to a daily-use system.

### Use a hardened system.

Although native device kernels are generally optimized for performance and seamless application use, it is possible to install a hardened kernel and sacrifice performance and usability for security.

[GrapheneOS hardened kernel](https://github.com/GrapheneOS/linux-hardened)

[Whonix hardened kernel](https://github.com/Whonix/hardened-kernel)

Likewise, system libraries are also developed with user ease in mind and can be hardened. One such example is memory allocation in a with malloc. Malloc by nature can be exploited for memory leaks and can be hardened. Despite this, keep in mind that a large number of programs are reliant on glibc or musl libc's native malloc.

[GrapheneOS hardened malloc](https://github.com/GrapheneOS/hardened_malloc)

### Use hardened CPU features.

CPU multithreading is inherently insecure, allowing programs to access cache memory that should not be available. It is possible to disable Simultaneous Multi-Threading (SMT) in most CPU settings but I highly recommend against it (especially if you value performance).

It is also beneficial to install CPU microcode updates released by processor manufacturers as they often contain security fixes. Most Intel and AMD CPUs accept microcode updates.

### Use Yubikeys.

Yubikeys are physical keys that act as a form of multi-factor authentication. They require physical access to a device's ports and are the highest level of physical authentication possible. I do not currently use a Yubikey but I am not opposed to the idea and may use one at some point in the future.

[Yubikeys](https://www.yubico.com)

### Use an external boot partition.

It is possible for a system's boot partition to be installed on an external (removable) flash drive. In this scenario, an operating system will start and run only under the condition that the boot partition flash drive is physically plugged into the machine. This means that a system can only be turned on and run by the person holding the boot partition. I do not recommend this by all means but it's a fun experiment I would love to try.

## Conclusion

This is not an exhaustive list of security tips but it suffices to say that following these tips will protect your devices against the majority of malicious threats. Balancing security and usability in a system is always an uphill struggle; however, following small practices and tips can increase the security of your personal data tenfold.
