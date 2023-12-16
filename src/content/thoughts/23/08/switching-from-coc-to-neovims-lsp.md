---
title: "Switching from coc to Neovim's LSP"
description: "I've finally made the switch from coc.nvim to Neovim's native LSP and would like to explain why and how I made the transition in case other Neovim users like me have been thinking about switching for a long time."
date: 2023-08-20T10:58:00-04:00
tags:
  - "thought"
  - "tech"
  - "vim"
  - "neovim"
  - "language server protocol"
  - "coc"
---

# Switching from coc to Neovim's LSP

I've finally made the switch from [coc.nvim](https://github.com/neoclide/coc.nvim) to [Neovim's native LSP](https://neovim.io/doc/user/lsp.html) and would like to explain why and how I made the transition in case other Neovim users like me have been thinking about switching for a long time.

> Side note: I will primarily be focusing on Neovim in this article but in many cases I am also referring to Vim, Neovim's predecessor.

## The Problem

Neovim is the greatest text (and code) editor I've ever used. It was my first introduction into [modal editing](https://unix.stackexchange.com/questions/57705/what-is-a-modeless-vs-a-modal-editor) and continues to impress me with magnificent hidden features and raw performance.

What Neovim has in phenomenal editing capabilities it lacks in development environment, however. Neovim has no Git integration, no linting or auto-formatting tools, and no language server support out of the box. It's the only reason why developers prefer VSCode in programming development and Neovim in command-line-only environments. Without built-in language support, using Neovim for anything other than configuration and system files becomes painful.

> Unless, of course, you're one of those deviants who prefer Nano...

As I grew to love the simplicity and editing tools of Neovim, I found myself wanting to reconcile Neovim with my work. At that time, the only viable alternative for language support in Neovim was through the `coc.nvim` plugin. This is what I have been using for the past two years for integrated development environment support.

## coc.nvim

Coc is a dream editing environment for computer science Vim enthusiasts like myself. It offers nearly all language server features out of the box, and installing plugins for different languages is very simple. It also has very good language support: I've never needed to install custom tools for any language I've worked with.

On the other hand, coc has two discernible flaws:

1. It utilizes NodeJS. This doesn't seem like a flaw until you notice Neovim using more than half of your RAM and maxing out your CPU when a language server is loading. For someone who primarily works in NodeJS environments for work and other personal projects, this makes it much harder to maintain speed as a Neovim selling point. Language servers should provide nearly instantaneous feedback.
2. It uses custom windows and highlights. This means writing custom highlight rules for informational popups, warning, and definitions, not to mention window border options. It also means custom keybindings to open and close the different windows.
3. Language servers all require custom configuration. Coc tends to bundle preconfigured servers, but the underlying language servers usually have nonstandard APIs.

While coc works in most aspects, it still is an inconvenience for built-in language support.

[Here is my old coc configuration](https://github.com/bossley9/dotfiles/blob/5f308c95cb5119f6b3fbe95846f0e47eeb873af7/user/config/nvim/lua/coc.lua) if you would like to use it.

## The Language Server Protocol (LSP)

The [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) aims to resolve all of these issues. This specification created by Microsoft is an attempt to standardize all language servers to follow the same conventions and communicate with clients via JSON-RPC. In more general terms, it is a guide for how to make a language server follow common conventions. This means that when a new programming language is created or introduced, it becomes trivial to add editor hints, warnings, compiler errors, and formatting by adhering to the language server protocol.

## Native LSP

When I heard Neovim would soon support LSP natively, I was ecstatic. It's the first major attempt to make Neovim a fully-fledged IDE since coc. Although I was excited, I was also hesitant - I didn't want to switch to a worse experience than the tools I was already using.

In the end, I decided to switch to Neovim's LSP, and I am glad I made the switch. Here are some of the benefits of using the LSP:

1. All languages work consistently if they follow the new protocol. It's so nice to not need to manually configure language linting and formatting because the language already follows the LSP. Neovim LSP has made full language support with a single command possible.
2. No custom windowing or highlighting is needed. Neovim integrates language server protocols into its native editor conventions, making language actions much easier if you know your way around Neovim. For example, linting and language definitions can be viewed in location lists and quickfix lists. Errors are displayed through Vim diagnostics and indicated with diagnostic signs. All popups and definition dialogs are opened through Neovim floating windows.
3. Performance is amazing. Neovim's LuaJIT interpreter is blazingly fast compared to NodeJS and it uses very little CPU and memory in the background. Neovim no longer freezes up when trying to edit React applications I work on.

On the flip side, there are areas in which Neovim's LSP can improve:

1. Getting started is a bit hard. The LSP interface is so low-level and rudimentary that [Neovim itself even recommends helper plugins](https://github.com/neovim/nvim-lspconfig) to make the interface easier to use. I appreciate the native approach but most end-users don't want to write a handful of boilerplate lua code just to get their IDE to work.
2. The tsserver toolchain sucks. I hate eslint and prettier with a burning passion, but unfortunately, I am required to use both for many work projects. This isn't strictly an Neovim LSP issue but highlights the fact that custom development environments have a hard time integrating with the native LSP experience.

[Here is my new LSP configuration](https://github.com/bossley9/dotfiles/blob/f140ff8f6843b884b293dad738b9399e02174995/user/config/nvim/lua/language-servers.lua) if you would like to use it.

## Should I switch?

Neovim's native LSP support is a huge step towards making Neovim a viable fully-fledged IDE for all projects, and I'm all for that. If you're currently using coc, it's definitely worth the switch. And if you're not using any language support with Neovim, there's no reason not to utilize it.

The short answer is yes. Unless you primarily use tsserver.

## Tributes

A few weeks ago, the original creator of Vim, Bram Moolenaar, passed away. Much of my work has been made possible through his contributions to open source software. He was a cornerstone in making Vi-like editors powerful and modern and will be greatly missed.
