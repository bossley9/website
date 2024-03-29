---
title: "Naming Files Effectively"
description: "Following these file naming conventions can actually make your life easier."
date: 2022-02-10T19:47:00-07:00
tags:
  - "thought"
  - "tech"
  - "unix"
---

How do you name your files? Capital letters for words? With dashes? Spaces? No file extension?

```
Design specs/
My Documents/
README.txt
archived-photos-2011.tar.gz
how_to_read.md
email-manifest
```

This is a question you may have never considered. Why does it matter how I name my files? Does it make a difference?

It actually does. Although there is no semantically "correct" way to name files, there are file naming rules you can follow to make your life easier. With a proper and consistent file naming convention, you can save yourself time, promote your brand, and help applications identify your files. Here are a few good rules to follow when naming files. 

## 1. Use file extensions.

A file extension is the suffix at the end of a file name following a period (".") character. File extensions are used to denote the type of a file (and by proxy, the programs designed to open that file). Some examples of popular file extensions include ".html", ".exe", ".txt", and ".docx".

For the majority of Windows users, this comes at no cost. Files by default come with file extensions attached to them. For Linux and MacOS users, however, it is fairly mundane to rename files and remove file extensions.

File extensions are important because they help both users and programs understand the data contained within that file. When a file has no file extension, it becomes difficult (or even impossible) for programs to read files. It also makes it difficult for users to understand file contents.

```
bg
etc
openbsd-is-better
1st-proposal
22-02-01
building-a-custom-beamer-theme
design-proposal
xcolor
```

Based on this file directory, there is no way of knowing whether each file is comprised of text, binary data, or written for a specific program. File extensions add clarity and precision in file browsing.

Additionally, including file extensions can make file operations easier. If you prefer the command line (like me), file extensions allow files to be grouped by type:

```sh
/usr/bin/grep -Rie 'openbsd' content/thoughts/*.gmi
```

## 2. Write dates in ISO format (when possible).

The ISO 8601 format is a date format designed to unify all formats. The internet currently employs hundreds of ways to write a single date. Below are a few ways to represent a date:

```
01/05/2012
1/5/2012
5/1/12
2012-01-05
```

Does that date format indicate January 5th, 2012 or May 1st, 2012? It's unclear. Many Americanized countries use the MM/DD/YY format while other countries use the DD/MM/YY format. Confused?

The ISO standard hopes to avoid this. It generally follows a "largest specificity first" format:

```
YYYY-MM-DD HH:MM:SS
```

[https://www.iso.org/iso-8601-date-and-time-format.html](https://www.iso.org/iso-8601-date-and-time-format.html)

The largest unit of time, year, is specified first, proceeded by the next largest unit of time, month. This pattern presents dates in a universally accepted format while improving searchability. Imagine a folder filled with various screenshots.

```
screenshot-22-01-01.jpg
screenshot-21-05-02.jpg
screenshot-19-11-31.jpg
screenshot-19-03-16.jpg
screenshot-18-08-28.jpg
screenshot-14-02-14.jpg
```

Following a largest specificity first naming format reduces the amount of wasted time searching for files. Imagine trying to find a file from March of 2019 in this folder. Filtering the files by the year 2019 alone reduces the results by more than half.

```
screenshot-19-11-31.jpg
screenshot-19-03-16.jpg
```

This illustration is trivial but the underlying concept is the same. When applied to multitudes of files, this technique proves to be very effective.

## 3. Use dashes for word separation.

While most operating systems allow spaces or underscores in filenames, I highly recommend using dashes as an alternative for a few reasons:

* dashes define natural word borders
* dashes are universal
* dashes improve SEO

Let's examine each.

### Dashes define natural word borders.

Try double-clicking on the word "the" in each of these sentences. Notice how double-clicking on the sentence with underscores highlights the entire sentence, while the other two only highlight the word itself. Strange, isn't it?

```
I walked to the store.
I_walked_to_the_store.
I-walked-to-the-store.
```

This is actually intended behaviour designed by the operating system. When text is double-clicked, the computer attempts to highlight the nearest "word". As it was illustrated, this "word" is not the same as a word in the English dictionary. Most operating systems define words as consecutive letters surrounded by non-word characters. In the above example, most operating systems define spaces and dashes as non-word characters, while an underscore is considered part of a word. This is significant for naming files because each word in a filename should be selectable by itself. Here is idealistic text selection behaviour in any program:

* if I click a line of text, the cursor will insert itself in between the two characters nearest to my cursor.
* if I double-click a line of text, the cursor will highlight the "word" nearest to my cursor.
* if I triple-click a line of text, the cursor will highlight the entire line of text.

Most programs will respect these three rules of text selection. Unlike underscores or other symbolic characters, dashes define natural word borders and allow the system to detect where words begin and end. In many cases, the average user will not run into any issues involving word borders except with text selection. Vim users, however, will understand the benefits of having well-defined borders.

### Dashes are universal.

If dashes and spaces behave similarly, why are dashes the recommended approach?

Dashes are universal. Spaces are not.

Depending on the program you're running, the operating system you're running, and even the keyboard you're using, a space can mean different things. Below are a few examples of how whitespace can be represented.

```
 <- this is a space
  <- this is a space
\t <- this is a space
\ <- this is a space
\r <- this is a (technically) space
\n <- this is a (technically) space
\cr <- this is (technically) a space
%20 <- this is a space
```

This illustration highlights the issue with using whitespace to separate words - space is not universally consistent. Whitespace on different machines can mean totally different things. Dashes, however, are consistent. In any context on any computer or machine you use (at least, presently), a dash is represented by a "-" character.

### Dashes improve SEO.

If you're a public personality or media influencer, you've likely already heard of Search Engine Optimization (SEO). SEO is a set of practices aimed towards making your content more visible to the intended audience. To Google, it means being the first result on the first page. To Youtube, it means clickbait visuals and high view counts. On Twitter, it means retweets. Improving the SEO of a public brand means improving the discoverability of that brand - in other words, the success or popularity of that brand.

Here is how dashes improve SEO. Pretend I have three files on my website under the following urls:

```
https://sam.bossley.xyz/my-link-here
https://sam.bossley.xyz/my link here
https://sam.bossley.xyz/my_link_here
https://sam.bossley.xyz/mylinkhere
```

Of the three of these urls, the one containing dashes will be the highest result on most search engines. The reason is because dashes define natural word borders while the other examples do not. The lack of space between "words" means that search engines such as Google will not be able to detect and match individual words. Additionally, the HTTP and HTTPS protocols encode all whitespace characters. This means that the link containing whitespace will become the following:

```
https://sam.bossley.xyz/my%20link%20here
```

Using the power of deduction, using dashes to separate words is the best candidate to improving SEO. Try this exercise: if you're a content producer or rising influencer, search your name on a popular search engine (such as Google) and count your position from the first result. If you're not the first result, you can probably employ techniques like this to improve SEO.

## Conclusion

File naming conventions are important. A consistent file naming convention can improve the success of your brand, help save you time, and - most importantly - make your life easier.
