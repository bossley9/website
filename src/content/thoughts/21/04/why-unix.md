---
title: "Why Unix?"
description: "Here are my reasons as to why everyone should switch to Unix-based operating systems that follow the Unix Philosophy."
date: 2021-04-15T12:35:00-04:00
tags:
  - "recommendation"
  - "tech"
---

I tend to throw around the terms "Unix" or "Unix philosophy" a frequent amount in many of my articles and conversations, but I realize that many people may not be not familiar with the terms or what they mean. I would like to give a brief overview of what Unix is, why it is so valuable to me, and why everyone should choose Unix over non-Unix variants.

## What is Unix?

Unix is, in short, an operating system design philosophy. It is a collection of software packages, file hierarchies, and patterns that make up many modern operating systems. Think of it in terms of cars - if individual cars are computers and their engines operating systems, the structure or blueprint of those engines might be Unix. For example, my Ford Fiesta might follow the same inner structure as a Honda Civic, but the two vehicles are vastly different in color, body shape, seat material, smart car interface, tire types, and more. Unix is like a design pattern that many operating systems follow.

[Unix according to Wikipedia](https://en.wikipedia.org/wiki/Unix)

There are many Unix operating systems still being used today. This includes operating systems such as MacOS, FreeBSD, OpenBSD, NetBSD, GNU/Linux, Solaris, System V, and others.

> Technically MacOS and GNU/Linux aren't technically Unix operating systems. MacOS is only a Unix operating system in name, and GNU/Linux is only a collection of Unix-like operating systems. Tsk, details.

## Why Unix?

And now for the big question: why would someone want to choose a Unix operating system over a non-Unix variant? What makes a Unix operating system far better than another non-Unix operating system such as Windows 10?

The answer to this question is the Unix philosophy.

When the first (real) commercial computer systems were being developed in the 1970s in Bell Labs, Ken Thompson and Dennis Richie (the creators of C, Unix, and... pretty much everything software) wanted to create a software design system that all computers should use in order to keep consistency between devices. The issue was that if everyone's personal computer used different file systems, different executable binaries, and different compilers, it would be impossible for people to share files and data between computers. This is simply called cross-platform compatibility. Thompson and Richie wanted to create software principles that every operating system should follow so that all operating systems could communicate with each other regardless of their external features or software focuses. In creating these principles, they inevitably created one of the greatest sets of software principles of all time: the Unix philosophy.

So what is the Unix philosophy? In addition to software principles and system organization (which I will only mention briefly since I don't want to bore everyone with technical details), the Unix philosophy was comprised of a set of spoken rules operating systems should follow. While there is a lot of debate over what the wording of the original principles are, I think Wikipedia (quoting Peter Salus) does a fantastic summarizing them into three core tenets:

1. Write programs that do one thing and do it well.
2. Write programs to work together.
3. Write programs to handle text streams, because that is a universal interface. Let me expand upon each tenet in further detail below.

[the Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)

## 1. Write programs that do one thing and do it well.

Programs were never meant to be the massive implementation monoliths they are today. I have so many issues with electron apps and browser "applications" for this reason. Browsers were intended for a single purpose - to display website content. When websites break those contracts and attempt to go outside those implicit bounds (password management, history management, data sync, OpenGL rendering, and others), browsers begin to tear apart at the seams. Why?

The reason is modularity. Modularity means that something can be broken down into smaller independent components called modules. Think of modular programs like Legos - easily broken into smaller sub-units that can then be recombined and rearranged. When a program is written to perform multiple functions and manage many unrelated process or states, the individual parts cannot be easily distinguished, reused, and definitely not rearranged. You lose modularity. It's like blowtorching legos and welding them together.

If modular programs are ideal, why are they rarely implemented? The reason is user convenience. People don't like to have to use multiple programs to accomplish a few tasks. People are lazy. It's so much easier to use a program that has everything "ready to go"; however, what modular programs are able to do that monolithic programs cannot do is be versatile. Let me illustrate what I mean with an example from my personal workflow.

I tend to avoid using suite products like Microsoft Word or Google Docs to edit my written documents because they are both inherently monoliths. In addition to normal text editing, they bake in spell checkers, formatting tools, and display tools. Instead, I use a combination of Vim, LaTeX, and Zathura to create my documents. How is this better? Let me walk you through the creation of my resume.

[Vim](https://www.vim.org/)

[LaTeX](https://www.latex-project.org/)

[Zathura](https://pwmt.org/projects/zathura/)

First, I write my resume using a program called Vim. If you haven't read my drawn out discussion of why Vim is a fantastic text editor, just know this - Vim allows me to edit text documents at an alarmingly fast pace. This is where LaTeX. LaTeX is a markup programming language that allows users to quickly format documents in a professional manner using styling rules and macros. Finally, I use Zathura to render my compiled LaTeX document as a PDF for viewing.

> Virtually all graduate research papers are written in LaTeX for its ability to format images, charts, and mathematical formulas. Once you get used to LaTeX, you begin to recognize LaTeX patterns and formatting. Especially if you read a lot of research papers. Like me. For fun :)

Until 2020, I used Google Docs to format and edit my resume. After switching to my current Vim, LaTeX, and Zathura workflow, my productivity and resume quality have both increased. Comparing the Google Docs resume to the new resume, it's nearly impossible to notice a difference in styling (they're obviously different in terms of contents, but who's looking?).

If both resumes look nearly identical, why does it matter which workflow I follow? It matters because the second workflow is more extensible.

I've already explained why I believe Vim is a superior editor to Google Docs in a previous post so I'll begin with Zathura. Because I use an external PDF viewer, I can modify the display of any PDF I view. Zathura allows dark mode that merges with the background of the window. In this case, since my viewing window is transparent blurred, I can achieve a fantastic look.

And then there's LaTeX. LaTeX is extensible because of it's programming functionality. I am able to create command macros to uniformly format each section of my resume. This gives me the upper hand over Google Docs (where you are forced to format each section individually). I can change the color of every instance of a subheading immediately. In addition, I can change the formatting of each resume entry uniformly as a whole.

The point of this drawn out demonstration is that each of these programs are modular units. I can use Vim to edit any text file, not just my resume. I can use LaTeX to format any document (including powerpoints and flowcharts), not just text documents. Finally, I can use Zathura to display any document, not just my resume.

With monoliths like Google Docs, you can only use them for single purposes. You can't break apart the components individually, much less repurpose them to work with other programs, which is a perfect segway into the Unix Philosophy's second tenet.

## 2. Write programs to work together.

In Unix, programs should work together and be able to interact with each other. Streams of data should be able to flow from one program to another. This doesn't necessarily mean that two programs use the same database server like Google or Microsoft products; rather, it means that the individual modular program units should be able to be built together to create an entirely new piece of software. Revisiting the Lego analogy, unique combinations of Legos can lead to truly amazing creations. Of course, I'll have to talk about one of my favorite low-level programs as an example: Fzf.

Fzf is a simple command prompt fuzzy finder. A fuzzy finder is a program that when given text input, filters a list of values in real time to find the value you are typing. Most search engines or search bars are fuzzy finders, but not all fuzzy finders are search bars. A perfect example of this is MacOS's spotlight search.

[Fzf](https://github.com/junegunn/fzf)

What makes a fuzzy finder different from a regular search bar is that it uses pattern matching, meaning it is case insensitive and fills in the blanks for misspelled or missing phrases. Fzf does all this through text streams, simply displaying inputs through a fuzzy finder interface and returning the chosen item. Because Fzf can take any input and return an output, it can be paired with virtually any program to make a more pleasant searching experience. For example, I use Fzf as my own "spotlight search" to find and launch any program. I also use it to navigate the folders in my file system. I additionally use Fzf to search for files in my coding projects to quickly switch to new files without ever having to think about the location of the files I'm looking for.

That's only half of Fzf's power. Because I can input any data stream into Fzf, I can even search individual file contents. This is truly a game-changer for development projects containing many text files or code modules.

Modular programs are so powerful because they can be combined and connected to other programs to produce wonderful tools. If given the choice between a bin of Legos and a hotglued Lego set, which would you pick?

## 3. Write programs to handle text streams, because that is a universal interface.

This is where most programs fall short. Text is the most accessible interface because it is readable by all users, can be translated to other languages, and can be read by screenreaders. One of my absolute biggest pet peeves is when progrms or interfaces obfuscate text so that text is baked into images or not even present at all.

A poor example of this is NCKU's graduation application portal, where text is baked into an image. This is absolutely inaccessible by screenreaders because they cannot parse images. Additionally, if the image is scaled incorrectly like it is on the website, it can ruin the readability of the content.

[NCKU graduation application portal](http://140.116.165.83/~lou/leave/)

But it's not just displaying data that creates issues - it's the storage of data that also creates issues. Imagine that you create a powerpoint with Microsoft Powerpoint. If you were to try to access that powerpoint file 30 years from now, do you think you could do it?

Probably not, right? The reason is because the program stores the powerpoint into a binary pptx file that can't easily be accessed by other programs. Microsoft wants you, the consumer, to only use their product so they obfuscate the data so that you can only read that file with their program. It's capitalism software. This is terrible because it's inaccessible and not sustainable as a pattern. In fact, Microsoft even recently switched their storage format of powerpoints from binary files to XML, rendering all powerpoints created before 2007 to be virtually useless. If you want something to be accessible and usable by other programs, consider this - is it a text file, or is it obfuscated?

[MS Powerpoint file formats](https://en.wikipedia.org/wiki/Microsoft_PowerPoint#File_formats)

I could explain in further detail the intricate beauties of why plaintext is superior to any binary blob that modern programs generate, but I think Luke Smith does an amazing job explaining this in his video on Linux extensibility:

[Luke Smith: "The Most Important Question in Linux: Extensibility"](https://www.youtube.com/watch?v=6qlCKne6MpA)

One of the most impactful takeaways from this video is this sentence: "Good luck trying to get access to your MS Powerpoint presentation in 20 years." The standing benefit of text streams is that text will never go away, but binary bits and encoding schemes will. Even program applications themselves fall under this category - try running an exe file on MacOS, or extracting your iCloud data on a Windows system. The point of text streams is that text is versatile in all situations, and it cannot be "replaced" or "deprecated" by future technologies.

## Conclusion

After a detailed explanation of the Unix philosophy and its tenets, I can reiterate my previous question: why would someone want to choose a Unix operating system over a non-Unix variant?

The answer is the Unix philosophy. Extensibility and modularity are at the core of why Unix is a superior operating system design to all other operating systems.

Next time you consider switching operating systems or want to try something new (like GNU/Linux or BSD), consider this: would you rather have a bin of Legos, or a Lego set hotglued together?
