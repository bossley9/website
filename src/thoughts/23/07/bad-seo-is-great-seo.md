---
title: "Bad SEO is great SEO"
description: "Everyone these days is striving for perfect SEO, so what is it? And what's the catch?"
date: 2023-07-11T09:58:00-04:00
image: "https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2023/seo-search.png"
tags:
  - "thought"
  - "reflection"
  - "seo"
  - "website"
---

![A Google search of "SEO"](https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2023/seo-search.png)

*SEO* (Search Engine Optimization) is a fancy blanket acronym for getting your pages to the top of search engine results. If you have great SEO, your website (or online store, or Youtube channel, or Instagram account) will be the first result on Google search or Bing search.

When I first started pouring more content onto my website and social media accounts, I wanted to have the best SEO like all big online brands. I performed a quick Google search of my name and wasn't surprised to find I wasn't even on the first page of results. Fortunately, I have a fairly uncommon last name and do not share a name with any large celebrity, so optimizing my discoverability was relatively simple:

1. Add relevant `<meta>` tags to all pages on your site. Wordpress and other site builders generally do this automatically.
    ```html
    <meta name="og:title" content="Some Page Title" />
    <meta name="twitter:title" content="Some Page Title" />

    <meta property="og:site_name" content="Sam Bossley" />
    <meta name="twitter:site" content="Sam Bossley" />
    <meta name="application-name" content="Sam Bossley" />
    <meta name="apple-mobile-web-app-title" content="Sam Bossley" />

    <meta name="author" content="Sam Bossley" />
    <meta name="twitter:creator" content="Sam Bossley" />

    <meta name="description" content="Some page description" />
    <meta name="og:description" content="Some page description" />
    <meta name="twitter:description" content="Some page description" />

    <meta name="twitter:card" content="summary" />
    <meta name="og:type" content="website" />
    ```
2. Add generic searchable tags or keywords to each page.
    ```html
    <meta name="keywords" content="sam,sam bossley,website,tech,frontend" />
    ```
3. Add a `robots.txt` file to your website root with bot crawling rules. This allows bots (Google, Bing, Microsoft) to look at your webpages and put them into their search engine results.
    ```plaintext
    User-agent: *
    Allow: /
    ```

Once I made these changes, my website slowly travelled up to the first slot in Google search results. Success!

Only it worked too well.

Starting in 2022 and continuing until 2023, I began to receive a steady increase in scam calls, spam emails, and bot messages on social media. It began with the occasional call, followed by a suspicious email, a stray text, all of which began increasing in number. One call became five. Two spam emails a day became twenty. At this point, I've gotten tired of the whole ordeal.

I finally decided to pull the plug.

1. Obfuscate my email. This won't suppress all bots but it will filter out a majority of them.
    ```plaintext
    // instead of
    john.doe@gmail.com
    // try
    john [dot] doe [at] gmail [dot] com
    ```
2. Disable most of my public social media accounts, or private them. I don't use a majority of them anyways.
3. Remove all bot traffic except maybe a few search engines. I will likely remove the remaining ones if I get tired of them.
    ```plaintext
    commit 994f9ba0ac8f61fe9a9505ac278d95494f51181f
    Author: Sam Bossley <bossley.samuel@gmail.com>
    Date:   Tue Jul 11 11:21:41 2023 -0400

        fix(seo): disallow bots

        goodbye seo!

    diff --git a/static/robots.txt b/static/robots.txt
    index c2a49f4..6ca25c0 100644
    --- a/static/robots.txt
    +++ b/static/robots.txt
    @@ -1,2 +1,6 @@
    User-agent: *
    +Disallow: /
    +
    +User-agent: Bingbot
    +User-agent: Googlebot
    Allow: /
    ```

I guarantee this will significantly hurt my discoverability online but I'm ok with this change. I can stand on my own without search engines and bot traffic. It's reminiscient of the old days of the internet where sites were shared through mailing lists, RSS feeds, and word of mouth. Do I really need to beg a corporation to move my website to the top of their magic list for me to be satisfied with my discoverability? No.

Sometimes bad SEO is great SEO.
