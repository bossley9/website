---
title: "Vim: The Ubiquitous Text Editor"
description: "I hope to persuade not only developers but everyone to learn vim and its keybindings. Vim is a text editing software that is built around the keyboard, and because of this, editing files in vim is all about learning keybindings and key sequences. I've spent the past eight months trying to wrap my head around vim keybindings, and while I'm still getting comfortable with the new text editing process, it has increased my productivity by allowing me to navigate files much faster and improving my typing speed. I hope to persuade everyone regardless of their background or computer skill to try vim."
date: 2020-12-22T15:56:00-04:00
tags:
  - "thought"
  - "tech"
  - "recommendation"
---

My peers and coworkers often wonder how I am able to get done with my work done faster than most when I am constantly pressed for time. What's my secret? How do I code so effectively? How do I complete all your homework assignments so fast? Am I just gifted with natural intelligence? (the answer to the last question is a definite "no".)

I usually respond with a single word: "vim."

If you're someone who spends most of their day typing, transcribing, or especially programming, I urge you to read this carefully. Vim will quite literally change your life. If you haven't ever heard of the word "vim" or don't even know what a "vim" is, sit back and relax - your world is about to be shattered.

The greatest bottleneck to technological progress (or really, any progress) is idea propogation. As soon as we come up with a novel idea or a solution to a problem, we need to spend time translating that idea into presentable content. The time it takes to propogate that idea is the greatest cost. Let me provide a tangible example. Let's say you're working on a paper for an advanced science course and you type out your abstract and rough drafts for the next five paragraphs. While taking a break and listening to a Spotify playlist, you suddenly become enlightened with inspiration for the fourth paragraph. You quickly open the Google Doc and scroll for a few seconds to the fourth paragraph, then begin typing. At that moment, you also feel motivated and change the sentence structure of the introduction paragraph. Taking a step back from this example, what was the cost? How could we have made this more efficient?

The precious time it takes for those ideas to present themselves on paper is the biggest cost. From the moment the idea is conceived in your mind, you must spend the next five to ten seconds opening the document and scrolling to the indicated position.

Using the previous example, assume your cursor is at the bottom of the document and you suddenly want to change the second word of the first paragraph. How would you go about doing that? First, you move your hand to the mouse. You then scroll all the way up to the top of the document. You then click in front of the second word. Moving your hand back to the keyboard, you backspace that word, then type the word you wanted. This is inherently inefficient because of the latency between the formation of an idea and the translation of that idea into practice.

But what if I said that we could minimize that time? What if the idea presented itself on paper as soon as it was conceived in your mind?

This is the bottleneck of progress. In a perfectly efficient world, as soon as an idea is conceived in someone's mind, it is already implemented and shared. Of course, this suggests future technology such as neural links or some technology that interfaces directly with a person's brain to translate ideas into documents.

What if we could reduce that bottleneck? What if it was possible to improve your efficiency without distant futuristic technology? This is where Vim comes into play.

Vim is a text editor that was first created in 1991. Its purpose was simple - to provide a text editor with improved editing capabilities. As writers and programmers, we tend to spend 10% of our time writing content and 90% of our time editing that content. Most editors today are built around writing content but not editing it, and it does not make sense for editors to be focused on the aspect of writing we only spend 10% of our time utilizing.

[https://www.vim.org](https://www.vim.org)

The first core difference between Vim and its other editor counterparts is its focus on keybindings. Vim considers computer mice to be a performance bottleneck - if a user's hands never leave the keyboard, they can continue to edit without a break in their efficiency. This small performance increase adds up over time, leaving you with minutes and even hours of time saved from moving your hand back and forth across the keyboard. The default keybindings of Vim allow you to navigated a document without ever having to use the mouse and scroll or click.

The second core difference between Vim and other editors is the introduction of modal editing. In normal text editors, you are always in an editing state - regardless of what you type while the editor is open, these characters will appear in the document. In Vim, there are different modes (or "states") to editing. Insert mode is easiest to understand because it mimics a regular text editor - anything you type will present itself as a character in the document. Normal mode is where Vim differentiates from other editors. In Normal mode, Vim makes available hundreds of keybindings and commands ready for a user to edit their program. A core concept of editing in normal mode, text objects, is the key behind Vim's efficiency.

Instead of breaking a document into individual characters like all modern text editors, Vim instead breaks a document into small units called text objects. Text objects are units of content that can be manipulated to a user's liking. Text objects can be a single word, a single phrase, an entire paragraph, or a function. Vim allows a user to run a number of permutations on a text object as a whole rather than a single character. It's hard to explain the power of Vim text objects without visual examples, so I will provide a few to highlight the power of Vim.

In these examples I will use Google Docs/VS Code and Vim side by side to show the differences in efficiency and editing speed. For source content, I use a bit of text from the Marvel Cinematic Universe Wikipedia page as well as some example text documents and sample React Typescript since this is what I work with most often. I also use dark mode in Vim - because who wouldn't?

[MCU Wiki page source text](https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe)

* From the bottom of the document, move the cursor to the very start of the document.

Google Docs: Scroll to the top, move the cursor to the start of the first pragraph, then click.

Vim: Type "gg" to move to the first column of the first line.

* Replace all instances of "MCU" with "DCEU".

Google Docs: Search for MCU, then double click and type DCEU for each instance of MCU.

Vim: Type ":%s/MCU/DCEU/g" to automatically switch into command mode and substitute every global instance of MCU with DCEU.

* Delete an entire sentence.

Google Docs: Move the cursor to the end of the sentence, highlight the sentence, then press backspace.

Vim: Type "v)hx" to go into visual mode, select the sentence object, move back a character, then delete.

* Remove all args from a async handler function definition.

Code: Move the cursor to the end of the parenthesis, highlight content within the parenthesis, then press backspace.

Vim: Type "f(di(" to find the parenthesis, then delete everything inside the parentheses text object.

* Find the file which contains the definition for "HERO_BANNER_IMG".

Code: Use Code's file search pane to search for the specified string, the click on the specified file.

Vim: Using Ripgrep and Fzf, parse files for the string, then use Vim tags to jump to the specified file.

* Surround a word with quotes.

Code: Click and type quotation marks at the start and end of the word.

Vim: Type "ysiw" using "vim-surround" to surround an inner text object with some character. This can be done in Vim a number of ways, including macros.

I haven't even provided any examples using Vim macros or complex text objects. Vim is an objectively more powerful editor than most text editors because it focuses on editing rather than drafting and provides powerful tools such as macros and text objects to improve editing workflows.

[why you should use vim (1)](https://www.youtube.com/watch?v=F6-phM56H-Q)

[why you should use vim (2)](https://www.youtube.com/watch?v=SkdrYWhh-8s)

How did Vim improve my workflow? How am I so effective at coding and coursework? The answer lies not in raw skill, but rather, the speed at which I am able to translate ideas into practice. As soon as I think of a potential solution for a coding problem, I am able to very efficiently implement said solution to test its functionality rather than deliberating on how it can be implemented and what functions and variables need to be changed.

A lot of people I know are actually willing to learn Vim - they simply haven't because they are under the assumption it is "hard to learn". How did I learn Vim? Vim actually has a built in tutorial that will walk you through switching from a standard text editor like Google Docs or VS Code to a Vim workflow. In 2019, I was a die-hard VS Code user. Near the start of 2020, I saw a few videos of Vim users using Vim and it blew my mind how efficient they were at translating their ideas into text and made it a goal to learn Vim before the end of the year. Like many people, I started using Vim by using the tutorial. It was painfully slow and hard to get adjusted to the new workflow, but I get better and faster at editing in Vim as time went on. As 2020 reaches a close, I believe that one of the best things I ever did this year was learn Vim, and I hope that any programmers or editors reading this will seriously consider learning Vim to improve their workflow and increasing their efficiency.

> "I've been using Vim for about 2 years now, mostly because I can't figure out how to exit it." - anonymous

> "Over 1 year, the average Vim user saves 11 minutes in productivity.
> However, they lose 27 hours through evangelising Vim to non-users."
