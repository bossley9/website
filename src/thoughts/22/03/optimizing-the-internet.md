---
title: "Optimizing the Internet"
description: "If we want to make the internet a more user-friendly place, we need to optimize it."
date: 2022-03-02T20:59:00-07:00
image: "https://cdn.bossley.xyz/files/thoughts/22/optimization-meet-fresh.png"
tags:
  - "thought"
  - "tech"
  - "frontend"
  - "optimization"
---

It frustrates me and anyone else browsing the internet when a webpage takes longer than ten seconds to load. Yesterday I was browsing the menu of Meet Fresh, a Taiwanese dessert chain, and was appalled by how long it took for the page to hydrate and become interactive. I would then scroll down and see a completely blank experience with half-loaded images even with my (almost) fiber internet.

[https://meetfresh.us/menu/](https://meetfresh.us/menu/)

![Google Lighthouse report for Meet Fresh yielding a score of 38 for performance](https://cdn.bossley.xyz/files/thoughts/22/optimization-meet-fresh.png)

> I couldn't believe my eyes and ran Google Lighthouse to verify page performance. The results are even worse than I thought.

How is this acceptable in 2022? With technology such as server-side rendering, static site generation, and with modern media formats such as webp and webm, how do we still have internet pages that take longer than five seconds to load? As a frontend software engineer, I feel embarrassed.

If you own or host any sort of content on the internet, this is specifically for you. If we want to make the internet a better place for everyone, we have to optimize anything and everything we produce - if we don't tailor our experiences for end-users, who are we creating an experience for?

Let's make the internet faster together.

## First, we need to optimize our content.

When you view this webpage, you establish a direct line of communication between yourself and me. As the owner of this webpage, it is my responsibility to effectively communicate the information I'm trying to send you. If I can't do that in a meaningful way, this webpage is a failure because it does not serve its intended purpose.

In the same manner, if I provide more information than what is necessary or provide different information than the information I intended to convey, I have also failed. Webpages should only display what they need or want to display and nothing more. When a webpage displays more than necessary, this is called overstimulation or information overload.

Sadly, most of the internet follows this pattern. Every modern webpage is a sensory overload of additional images, popups, modals, adverts, and other noise that distracts us from the original intent of the webpage. I always hated how modern blogging sites such as Medium prompt bloggers to insert semi-related images that distract users and serve no purpose other than to fulfill the contemporary human's need for stimulation.

It's ok, you'll be safe from distraction on this website. Rest, weary traveler.

If we want to make the internet better, we need to optimize our content. Stop displaying images or popups that serve no essential or functional purpose. Stop adding extraneous colors and cool effects that require heavy plugins and libraries. When content is precise and focused, it becomes easier to communicate ideas.

[how I experience the web today](https://how-i-experience-web-today.com/)

[this is a web page](https://justinjackson.ca/words.html)

## Second, we need to optimize our media.

The primary culprit of most laggy or unperformant websites is its optimization of media (or lack thereof). Most images, animations, and videos can be optimized for performance at little to no cost. Since most of the internet is comprised of images, I will go into detail on images.

### Try lowering image resolutions.

Unless you're trying to send raw uncompressed photography across the internet, most images can be downsized to smaller than 1000x1000 pixels. This is because most modern desktop resolutions will only display images smaller than that in a web browser. If you want your website to load in less than one second on a phone, it cannot load oversized images. Be aware that most phones have a maximum width of less than 600 pixels.

### Don't use alpha channels when you don't need to.

Alpha channels allow for the pixels of an image to be transparent. This is how pngs are able to be semi-transparent while other formats such as jpg will always be opaque. If you generally use solid images without transparency, try removing alpha channels in a photo editor such as GIMP or Photoshop, or convert to another image format entirely. Jpg images are objectively smaller than png images in most cases.

### Export images at 85% quality.

When possible, export images at 85% quality (or lower). Any quality above 85% is generally invisible to the naked eye. Most users (including yourself) probably won't be able to tell the difference between an image at 100% quality and an image at 85% quality.

### Remove image metadata.

Most camera raw image files are so large because they are metadata-rich. Images can usually store metadata, such as camera modal, camera maker, focal length, exposure time, and even comments on the image. Images additionally store a small thumbnail version of itself within its container. A lot of this can be stripped from an image in any image editor.

### Chroma quarter images.

Modern images are often filled with many colors that are invisible to the naked eye. By removing colors and complexity that humans cannot discern from images, we can reduce the size of our images on the internet at no visible cost. This is called "chroma quartering", "chroma subsampling", or "chroma 4:2:0". Most image editors will give options for subsampling at export time.

## Third, we need to optimize our experience.

In the event that content needs time to buffer or load, we need a fallback to indicate intentful loading to the user. In other words, we need to be able to tell the user "don't worry, I know this content is loading but it's almost done, don't leave this site!". If we don't effectively acknowledge the loading and calm the user, they will give up and leave. Imagine any time you've seen a spinning loading indicator - how long does it usually take for you to reload the page or close the tab?

![a generic loading indicator](https://cdn.bossley.xyz/files/thoughts/22/optimization-loading.gif)

When we load, we need to indicate to the user that progress is happening behind the scenes. The reason most people click away from a spinning loading indicator like the one above is that there is no indication of progress or change over time.

We can do better. Instead of an infinite loader, we can display a progress bar, a more dynamic loading indicator (such as Google's various loading indicators), or a skeleton state. In fact, most of the modern web uses skeleton loading states to convey the idea of urgency and progress. A skeleton loading state is when a blank page displays shimmering gray bars to indicate content that will appear.

[what you should know about skeleton screens](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)

## Conclusion

The modern web is sometimes still painfully slow. If we want to improve the internet experience for everyone, we need to work together to fix some of the underlying issues. First, we need to optimize our content. The internet should be a distraction-safe information haven. Second, we need to optimize our media. Images and animations can always be downsized to be more economic. Finally, we need to optimize our experience. We should ease users into a friendly experience rather than force them to give up.

If you run Google Lighthouse on my website, you'll find across the board that I have made sure my entire site is optimized for all users. I want this space to be fast, effective, and welcoming.

![Google Lighthouse report for this site yielding a score of 100 for performance](https://cdn.bossley.xyz/files/thoughts/22/optimization-my-site.png)
