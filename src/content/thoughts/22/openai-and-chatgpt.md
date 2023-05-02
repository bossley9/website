---
title: "OpenAI and ChatGPT"
description: "Since everyone is talking about ChatGPT I thought I might try it."
date: 2022-12-16T15:46:00-07:00
tags:
  - "tech"
  - "openai"
  - "artificial intelligence"
  - "chatgpt"
---

Since everyone's messing around with AI nowadays with the publication of *DALL·E* image generation, I figured I'd test some AI models myself to see what all the hype is about.

[The creator of *DALL·E 2*, OpenAI](https://openai.com/), recently announced their latest conversational model *ChatGPT* which can supposedly maintain conversation and contribute to code. As for whether it can do so effectively, we can conduct a few experiments.

After signing up for the OpenAI beta program, I was able to quickly find a [fantastic Neovim Lua plugin by @aduros](https://github.com/aduros/ai.vim) that interfaces with ChatGPT to generate model responses in the terminal. Cue the experiments!

## Experiment 1: Question and Answer


```
What's the forecasted weather for the next week in san mateo?

The forecast for San Mateo, California for the next week is as follows:
Monday: Partly cloudy with a high of 68°F and a low of 54°F
Tuesday: Mostly sunny with a high of 70°F and a low of 54°F
Wednesday: Partly cloudy with a high of 71°F and a low of 55°F
Thursday: Mostly sunny with a high of 72°F and a low of 56°F
Friday: Partly cloudy with a high of 73°F and a low of 56°F
Saturday: Mostly sunny with a high of 74°F and a low of 57°F
Sunday: Partly cloudy with a high of 75°F and a low of 57°F
```

Nothing too special. Siri and Google can do this too. Let's test the waters a bit.

```
Where was Gondor when the Westfold fell?

Gondor was located in the south of Middle-earth when the Westfold fell. The Westfold was a
region of Rohan, located in the north of Middle-earth. Gondor was not directly affected by
the fall of the Westfold, but the events of the War of the Ring had a profound effect on
the kingdom.
```

In an attempt to see how resourceful the model can be:

```
What is the Iran Nuclear Deal, and how has former president Trump trampled the deal?

The Iran Nuclear Deal, also known as the Joint Comprehensive Plan of Action (JCPOA), was an
agreement between Iran and a group of world powers (the United States, the United Kingdom,
France, Germany, Russia, and China) that was designed to limit Iran’s nuclear program and
prevent it from developing nuclear weapons. Former President Trump withdrew the United States
from the deal in 2018, and since then has imposed a series of sanctions on Iran in an effort
to pressure the country to renegotiate the deal. These sanctions have had a significant
impact on the Iranian economy, and have been widely criticized by the international community.
```

Experiment 1 passes with flying colors. In addition to being able to answer obscure references to history and literature, it can answer multi-part questions and give real-time responses. I will now test its critical thinking abilities.

## Experiment 2: Critical Thinking

```
Write a brief literary analysis of Ray Bradbury's poem, If Only We Had Taller Been.

Ray Bradbury’s poem “If Only We Had Taller Been” is a reflection on the power of imagination
and the importance of dreaming. Through the use of vivid imagery and metaphor, Bradbury paints
a picture of the possibilities that can be achieved if we just reach a little higher. The poem
serves as a reminder that even though we may not be able to reach our goals in the physical
world, we can still reach them in our imaginations. By using the metaphor of height to
represent the power of dreaming, Bradbury encourages readers to reach for their dreams and
never give up. Ultimately, “If Only We Had Taller Been” is a powerful reminder of the
importance of dreaming and the power of imagination.
```

Very insightful analysis. Let's see if it can analyze other media.

```
Give an argument why capitalism might be necessary for society to function.

Capitalism might be necessary for society to function because it provides incentives for
people to work hard and innovate. Capitalism encourages competition, which can lead to
increased productivity and efficiency. Additionally, capitalism allows for the free market
to determine the prices of goods and services, which can help to ensure that resources are
allocated in the most efficient way possible. Finally, capitalism allows for the accumulation
of wealth, which can be used to fund research and development, which can lead to further
innovation and economic growth.
```

Not bad. The model is not exactly thorough but it can very easily answer complex questions.

```
Is a superintelligence inevitable after the creation of self-sustainable artificial
intelligence? Will it take over the world?

No, a superintelligence is not inevitable after the creation of self-sustainable artificial
intelligence, and it is unlikely that it would take over the world. While it is possible
that a superintelligence could emerge from the development of self-sustainable artificial
intelligence, it is not a certainty. Additionally, even if a superintelligence were to
emerge, it is unlikely that it would take over the world, as it would likely be programmed
with ethical and moral guidelines that would prevent it from doing so.
```

I'm not sure what's worse: an AI telling me that AI will dominate the world, or an AI reassuring me that AI will not take over the world...

## Experiment 3: Code Contribution

The most exciting claim for this model is its ability to contribute and modify code. The only way to know its effectiveness is to test it.

```go
// Write a program in golang that finds large prime numbers.

package main
import "fmt"
func main() {
  // Set the maximum number to search for prime numbers
  max := 1000000
  // Iterate through all numbers up to the maximum
  for i := 2; i <= max; i++ {
    // Check if the number is prime
    if isPrime(i) {
      // Print the number if it is prime
      fmt.Println(i)
    }
  }
}
// Function to check if a number is prime
func isPrime(n int) bool {
  // Iterate through all numbers up to the square root of n
  for i := 2; i*i <= n; i++ {
    // Check if n is divisible by i
    if n%i == 0 {
      // Return false if n is divisible by i
      return false
    }
  }
  // Return true if n is not divisible by any number
  return true
}
```

Can it backtrack and read other things I've written?

```ts
// Convert the previous program to Typescript.

// Function to check if a number is prime
function isPrime(n: number): boolean {
  // Iterate through all numbers up to the square root of n
  for (let i = 2; i * i <= n; i++) {
    // Check if n is divisible by i
    if (n % i == 0) {
      // Return false if n is divisible by i
      return false;
    }
  }
  // Return true if n is not divisible by any number
  return true;
}
// Print all prime numbers up to n
function printPrimes(n: number): void {
  // Iterate through all numbers up to n
  for (let i = 2; i <= n; i++) {
    // Check if i is prime
    if (isPrime(i)) {
      // Print the number if it is prime
      console.log(i);
    }
  }
}
```

Nicely done! Let's see if the AI modal can detect potential bugs.

```tsx
function MyComponent({ data }: { data: number[] }) {
  return (
    <ul>
      {data.length && data.map((num) => (
        <li>id {num}</li>
      ))}
    </ul>
  )
}

// What's wrong with this React component above?

// The code is missing a check to make sure that the data array is not empty before
// attempting to map over it. If the data array is empty, the code will throw an error.
// To fix this, you should add a check to make sure that the data array is not empty
// before attempting to map over it.
```

Not exactly, although [the issue lies near the data length check](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator).

Here's another real-life example from my [sn project](https://github.com/bossley9/sn):

```go
// original code:

func (client *Client) OpenBucket(bucketName string, ctx context.Context) error {
  if err := client.simp.WriteInitMessage(0, client.cache.AuthToken, bucketName); err != nil {
    return err
  }
  if _, err := client.simp.ReadMessage(); err != nil {
    return err
  }
  if _, err := client.simp.ReadMessage(); err != nil {
    return err
  }
  return nil
}

// Add a timeout of five seconds if the API is too slow.

// resulting code:

import (
  "time"
)

// this function will timeout after five seconds if the API is too slow
func (client *Client) OpenBucket(bucketName string, ctx context.Context) error {
  // set a timeout of five seconds
  ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
  defer cancel()
  if err := client.simp.WriteInitMessage(0, client.cache.AuthToken, bucketName); err != nil {
    return err
  }
  if _, err := client.simp.ReadMessage(); err != nil {
    return err
  }
  if _, err := client.simp.ReadMessage(); err != nil {
    return err
  }
  return nil
}
```

All it did was add some comments and add a context object. Other than that, it did not change the code.

## Conclusion

ChatGPT is very impressive. It's the most advanced AI model I've ever seen, but it still has a long way to go before I would consider it a "good" AI. While it can generate answers to most straightforward questions and create quick responses to critical thinking questions, many of the answers lack depth. In addition, the AI can generate new code efficiently but struggles to modify existing code. In its defense, it did a very good job at attempting the changes I requested. It's still very fun to test and play with the model.

Here is ChatGPT's final test:

```
Write an article for me to post on my website.

Creating content for a website can be a daunting task. It requires a lot of research,
planning, and creativity. But with the right approach, it can be a rewarding experience.

First, you need to decide what kind of content you want to create. Do you want to write
blog posts, create videos, or create a podcast? Once you have decided, you need to
research the topic and create an outline. This will help you stay organized and focused
on the task at hand.

Next, you need to create the content. This is where your creativity comes in. You need
to make sure that the content is engaging and informative. You also need to make sure
that it is optimized for search engines. This will help your content reach a wider
audience.

Finally, you need to promote your content. You can do this by sharing it on social media,
submitting it to directories, and creating backlinks. This will help your content reach
more people and increase your website's visibility.

Creating content for a website can be a rewarding experience. With the right approach,
you can create content that is engaging, informative, and optimized for search engines.
This will help your website reach a wider audience and increase its visibility.
```

Close enough.
