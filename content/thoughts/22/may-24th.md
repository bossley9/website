---
title: "May 24th"
description: "Working a full year in a full time frontend engineering position has taught me a lot."
date: 2022-05-24T16:51:00-07:00
tags:
  - "reflection"
  - "frontend"
---

Today marks my one year anniversary working at my current occupation. It's been a really long year filled with new discoveries, triumphant successes, and a proportionate amount of crushing failures. There were many times I wanted to give up. All the same, there were many times I felt confident and successful with the effort I was putting into my work.

What can I say about the software industry after working in a frontend web engineering position after a year? At the very least, it's a lot different than I thought it would be. As my first time working on such a large team of developers, I've grown a lot through my own experiences and failures. I want to summarize my professional development in the past year because growth is the only indication of change and success, and it's equally important for me to reflect on my growth and mistakes in order to learn from them.

Below is my professional development in the tech industry over the course of a year summarized into a few main learnings.

## Engineering is 90% communication and 10% programming.

When I first started my position, I was under the impression that I would be coding most of the time and occasionally interacting with my teammates and product team. That could not have been further from the truth. While programming prowess is important and useful in industry, it is much more valuable to be able to communcate effectively. It doesn't matter how good you are at coding if you can't explain what your code does.

Part of the onus falls on the nature of software in industry. As not everyone has a technical background, we need to be cognisant that not everyone will know what a "programming language" is or what an "operating system" is. On my website I tend to assume that those of you reading this are somewhat educated in the realm of software/hardware principles, but communicating ideas to the business side of a company is another matter.

Effective communication also saves time. Most of my time spent reviewing a pull request is trying to understand what the problem is and what that developer did to solve the issue. Similar to the "5 whys exercise", I tend to internally drill myself with questions until I can find the core issue of a problem I'm facing and explain it to my peers. I've learned that if you can communicate a problem effectively, it becomes less of a struggle for others to understand the issue and resolve it sooner. As a result, it takes less time for me to get my pull requests reviewed and merged because I always attempt to write very clear descriptions.

```
We can't upgrade to 12.1.6 because the tests aren't passing.
> Why aren't the tests passing?
We can't upgrade to 12.1.6 because dynamic() doesn't work in tests.
> Why doesn't dynamic() work in the tests?
We can't upgrade to 12.1.6 because jest doesn't load dynamic imports synchronously.
> Why doesn't jest load dynamic imports synchronously?
We can't upgrade to 12.1.6 because it includes a bug where jest doesn't load dynamic imports synchronously.
```

[This was a real issue we had when upgrading to NextJS 12.](https://github.com/vercel/next.js/issues/36647)

## Non-technical personnel have no idea what they're talking about.

This is clearly a generalization and not entirely true for every person or situation but it is true more often than I would care to admit. One of the most frustrating parts of working with the business and data sides of a company is that it is difficult to explain technical roadblocks and conflicts.

```
Well can't you just add a new function that counts users and records their age?
> If it were that easy I would have already done it by now.
We should add a payment verification system to our app.
> I can... if you give me a month of time do it...
```

It can be frustrating because usually the engineers understand the product more than the product team. 

```
What if we remove this page entirely?
> No, we can't, end users are still using it.
I think we should remove it anyways.
> Ok, I'll remove it.

Wait a second, we need that page! Users are sending in complaints! Add it back!
> That's weird. It's almost like I warned you about this.
```

Just because someone tells you to do something doesn't mean you should always do it. One thing I've learned is that simply by being an engineer working on a product, it means that you are the expert for that product. Other people can give you ideas on how that product should work but you are ultimately responsible for the product's success.

People will also blame you if the product fails.

## Learn to disagree with people and be ok with it.

Everyone has opinions and it's important to recognize them. It's not very often that someone's opinion is "wrong" - instead, you may just disagree with them.

Software (to no surprise) is a very opinionated subject. If I had my way we would all be using TUIs and fediverse-decentralized services. Every developer has a unique perspective on how a project should be organized or how a feature should be implemented. No one will ever completely agree with another person and it's important to accept that as fact.

[join the fediverse](https://jointhefedi.com/)

Having differing opinions is a good thing. A lot of people have this misconception that if everyone had the same beliefs, the world would be a better place. The last time we had a large population who held the same beliefs was in Germany in 1938. On the contrary, having a diverse set of opinions and beliefs means that everyone gets to see problems from different perspectives. It means we can learn from each other and surpass our own misconceptions or blindsighted view of an issue. Similarly, we can compromise and create generally "good" solutions to these problems that benefit everyone. It's the reason why democracy is favored over dictatorship.

Applying this notion to software, it's good for other developers to criticize my implementation of a feature. Instead of getting angry about their criticisms, I can instead stand in their point of view, understand their reasoning, and make my own conclusions based on their comments. It pays off to learn to be ok with someone calling your code "bad" because you will learn to be an even better engineer than before.

```
I think your implementation needs work. Why nest this when we can move this variable outside of this function entirely?
> I've never thought about that. Thanks for the feedback!
```

## Final Thoughts

What have I ultimately learned over the course of the year? I believe that all of the skills and principles I've learned this year have made me more independent as a developer. I'm no longer restricted to do whatever someone tells me to do. I am able to make my own decisions in software and learn from my questions, choices, and consequences.

I'm grateful for being able to learn and grow professionally throughout the year because all of these skills are applicable to situations outside of a development setting. One year in the industry is a satisfying milestone in my life and I hope to continue with many more to come.
