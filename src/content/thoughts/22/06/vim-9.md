---
title: "Vim 9"
description: "An overview of my thoughts on Vim 9 and the new Vim9script"
date: 2022-06-28T21:53:00-07:00
tags:
  - "thought"
  - "vim"
  - "vimscript"
---

Vim 9 released today and it's a game changer.

[https://www.vim.org/vim90.php](https://www.vim.org/vim90.php)

If you aren't a familiar with Vim, it's a powerful text-based text editor that's been around for ages. It's a direct descendent of Vi, which is a descendent of Ex, which is a descendant of Ed, the first text editor ever created. It's often still used on most Unix systems as the default text editor after a brand new install.

I've been using Neovim (a Vim successor) full time since early 2020 and it has begun to dominate my entire workflow, improving my efficiency all around. Of course, when infrequent updates to Vim propagate to release, they always to catch my eye.

Here are the notable updates in Vim 9 worth mentioning.

## New Autocommands

Vim 9 introduces a few new autocommands:

```vim
CompleteDonePre       after Insert mode completion done, before clearing info
DirChangedPre         before the working directory will change
InsertLeavePre        just before leaving Insert mode
ModeChanged           after changing the mode
SigUSR1               after the SIGUSR1 signal has been detected
WinClosed             after closing a window
WinScrolled           after scrolling or resizing a window
VimSuspend            when suspending Vim
VimResume             when Vim is resumed after being suspended
```

I'm fairly certain that everyone who uses Vim has written their own hacky functions to get mode updates. Now it can be done with ModeChanged:

```vim
def g:MyFunction(mode: string)
  " callback here!
enddef

augroup mode_change
  au!
  au ModeChanged * call g:MyFunction(mode())
augroup end
```

## New Operators

Vim now has bit shifts and nullish coalescence!

```vim
>>                    bitwise right shift
<<                    bitwise left shift
??                    falsy operator
```

It's mostly syntactic sugar:

```vim
str1 ? str1 : strFallback

" becomes

str1 ?? strFallback
```

However, the falsy operator is potentially more efficient than the original ternary operator since "str1" is evaluated twice in the vimscript ternary.

## Bug Fixes

Bug fixes are always good - especially the documentation ones.

[See the patches](https://vimhelp.org/version9.txt.html#bug-fixes-9)

## Vimscript

With the introduction of Vim 9, Bram announced a new age of Vim internal tooling which immediately captured my attention: Vim9script. This new scripting language is meant to replace the original Vimscript with a cleaner modern alternative to make plugin writing easier than ever. It also has associated performance benefits: "An increase in execution speed of 10 to 100 times can be expected."

I use vimscript for all of my configuration files and I want to highlight a few of my favorite changes that will greatly clean up my code.

### Reloading a Vim 9 script clears functions and variables by default.

This is huge.

When vimscript is normally reloaded, old definitions are not erased by default. This makes debugging variables and functions a pain because random callback functions you thought were cleared are actually still defined and causing conflicts.

If you write this script:

```vim
fu SomeFunc()
  echo "hello"
endf

fu CriticalFunction()
  call SomeFunc()
  " ...
  call SomeFunc()
endf
```

And then rename a function but not all of its calls:

```vim
fu SomeFunc2()
  echo "hello"
endf

fu CriticalFunction()
  call SomeFunc2()
  " ...
  call SomeFunc() " this line never changed
endf
```

This might still be considered valid scripting since "SomeFunc" is still defined somewhere. With Vim 9, Vim9scripts will clear all old definitions.

### Comments are now denoted by # instead of ".

You used to have to carefully place your comments to avoid confusion. Here's an example:

```vim
set viminfo="" " disable viminfo
```

What quotes are for the string literal? And what quotes are for the comment?

On the other hand, Vim9script is looking pretty good.

```vim
set viminfo="" # disable viminfo
```

### Using backslashes for continuation are hardly ever needed.

This change makes a multiline declarations less of a pain:

```vim
let g:coc_global_extensions = [
  \ 'coc-clangd',
  \ 'coc-css',
  \ 'coc-go',
  \ 'coc-json',
  \ 'coc-tsserver',
  \ ]

# becomes

let g:coc_global_extensions = [
  'coc-clangd',
  'coc-css',
  'coc-go',
  'coc-json',
  'coc-tsserver',
]
```

It makes indented blocks way more readable:

```vim
call termopen(
  \s:shell_name, {
    \'on_exit': 'Terminal_exit',
    \'cwd': g:cwd,
  \})

# becomes

call termopen(
  shell_name, {
    'on_exit': 'Terminal_exit',
    'cwd': g:cwd,
  })
```

### Functions now have a new definition syntax, argument types, and no longer need to reference the "a:" dictionary.

Working with function arguments in Vim has always been confusing. You either had to refer to them by their argument number ("a:1") or by name in the "a:" dictionary ("a:x"). There's never been any type safety in vimscript as far as I'm aware.

The new definition syntax is cleaner and supposedly faster since each of these functions are type-checked and precompiled before execution.

```vim
fu! s:popup_new(x, y, w, h)
  let l:col = float2nr(&columns * a:x + 2)
  let l:row = float2nr(&lines * a:y + 1)
  let l:width = float2nr(&columns * a:w - 4)
  let l:height = float2nr(&lines * a:h - 3)
...
endf

# becomes

def popup_new(x: number, y: number, w: number, h:number)
  let l:col = float2nr(&columns * x + 2)
  let l:row = float2nr(&lines * y + 1)
  let l:width = float2nr(&columns * w - 4)
  let l:height = float2nr(&lines * h - 3)
  ...
enddef
```

## Final Thoughts

Vim 9's new scripting language is like the transition from Javascript 2015 to ES8. It's becoming a super weird highly processed tooling language. And I have a love-hate relationship with it.

All in all, Vim is moving in a good direction in the future. We're finally moving away from the Vi days while maintaining a small yet powerful editing tool. If you're curious to read the full changes for yourself, try updating to Vim 9 or reading the help page with ":h vim9".

[https://vimhelp.org/version9.txt.html](https://vimhelp.org/version9.txt.html)
