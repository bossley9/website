---
title: "Enhancing Security With Yubikeys"
description: "I've recently started using Yubikeys and really like them. They're a stronger and more convenient form of authentication."
date: 2022-11-06T11:27:00-07:00
image: "https://cdn.bossley.xyz/files/thoughts/22/yubikey-size-comparison.jpg"
tags:
  - "thought"
  - "recommendation"
  - "yubikey"
  - "security"
---

I started using Yubikeys and I can't recommend them enough.

[Yubikeys](https://www.yubico.com/products/yubikey-5-overview/) are a new form of multi-factor FIDO authentication that prevents remote hackers from accessing your personal data. A Yubikey is a physical key that enforces in-person authentication via physical touch. To access data protected by a Yubikey, a bad actor first needs to type in a password or Yubikey access PIN. That actor would then need to physically touch the key to confirm user presence.

Without physical access to the device being hacked, accessing protected data is impossible. It is for this reason that Yubikeys are so powerful.

In addition, Yubikeys are convenient. Authentication with Yubikey takes a fraction of a second. The keys are small and portable and can fit onto keychains. You can use a Yubikey to lock a device, encrypt a hard drive, or enforce MFA with modern accounts such as Google, Microsoft, and Github.

![Size comparison of a Yubikey to a standard USB drive from Microcenter and a pen](https://cdn.bossley.xyz/files/thoughts/22/yubikey-size-comparison.jpg)

While there are many brands of FIDO authentication to choose from, I chose Yubikey because it is the most popular on the market and has stellar support: [Google employees have been using Yubikey since 2009](https://www.yubico.com/resources/reference-customers/google/).

## Usage

In order to effectively use Yubikeys you'll need to purchase two. One is for primary usage while the other will be kept as a spare in case of an emergency. It's best to keep an alternate key in case you lose the primary key and get locked out of devices and servers.

You can choose any type of Yubikey but I recommend the 5C NFC key for the best compatibility with USB C ports and mobile phones. If you'd like a key for stationary desktops without additional hassle, you'll want a 5C Mini key. While all keys provide the same functionality, the form factor can improve a key's portability or convenience.

Once you receive the keys, download the [Yubikey manager](https://www.yubico.com/support/download/yubikey-manager/) to set a pin.

```sh
# if you use NixOS
nix-shell -p yubikey-manager

ykman list # sanity check

# You will type in this PIN every time you authenticate with the key.
ykman fido access change-pin -n YOUR_PIN_HERE
```

With that, you're all set! You can set up a Yubikey as a form of authentication for any purpose.

If you would like to use your Yubikey for SSH authentication, you will need to generate a key with elliptic curve 25519 cryptography:

```sh
# Plug in the Yubikey.

# Do not type in a passphrase: you can rely on the Yubikey PIN with no practical loss in security.
ssh-keygen -t ed25519-sk -O resident -O verify-required

# Then rename the generated key files to id_rsa.pub and id_rsa.
```

If you need to add the SSH key to a new device (or add a second or backup Yubikey):

```sh
# Plug in the Yubikey.

cd ~/.ssh
ssh-keygen -K
# a reboot (or patience) may be required for the downloaded keys to take effect.
```

You can generate a Yubikey API key if necessary by visiting the [official Yubikey API key signup](https://upgrade.yubico.com/getapikey/) and generating a Yubikey OTP by touching the key.

## Security Concerns

Many people are skeptical about the validity or safety of Yubikeys for good reason - after all, Yubikeys are only a recent phenomenon. However, elliptic curve 25519 encryption is [proven to be just as strong as RSA 4096 encryption](https://proton.me/blog/elliptic-curve-cryptography) with the additional benefit of using a smaller keyspace and therefore requiring less computational power.

If you're still paranoid, [here are the white papers](https://cdn.bossley.xyz/files/thoughts/22/rsa-and-ecc-comparative-analysis.pdf).

