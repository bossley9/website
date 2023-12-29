---
title: "From Hugo to Astro"
description: "I finally switched my website infrastructure from Hugo to Astro and here's why."
date: 2023-04-16T23:48:00-07:00
tags:
  - "thought"
  - "hugo"
  - "astro"
  - "tech"
  - "frontend"
  - "website"
---

It's ironic, really.

I now use JavaScript to build my non-JavaScript website.

## History

I've been using [Hugo](https://gohugo.io/) to build my personal website (yes, this website!) for the past two years. I wanted to use a static-site generator (SSG) I had complete control over so I could manually upload raw HTML, CSS, and JS files to a remote server. Hugo was the best candidate - after dabbling with a hosted React server and a few other SSGs, I ended up choosing Hugo largely due to its performance an extensibility. One of the greater selling points of Hugo was its sheer speed and its ability to generate any type of outputs (namely, [gemtext](https://gemini.circumlunar.space/docs/gemtext.gmi)). I've been using it ever since.

So what changed?

## Motivation (Why Not Hugo?)

First, I need to explain why I decided to move away from using Hugo.

> Before I begin, I want to clarify - I don't hate Hugo! I think it's a great project that does a fantastic job. It just doesn't suite my current needs.

### 1. Hugo templates are restrictive.

Hugo's greatest strength (and weakness) is its strict adherence to templates. Hugo requires all pages of a website to follow a specific hierarchical structure. Every *single* page must fall under a *section*, and all must fall under a *homepage*.

```
homepage
  * section
    * single
  * list
  * taxonomy list
    * taxonomy
```

This structure initially made it very easy to organize all the blogposts I write. However, as I added more individual pages and content sections, my website grew into a nightmare of content management. I began writing hacks to step around these imposed restrictions which made it difficult to add more various content to my site. I began manipulating frontmatter, creating empty markdown templates and default layouts to step around the rules.

```md
---
title: "some custom page"
description: "this shouldn't be a section so I need to hardcode the type and layout to be custom"
type: "singlepage"
layout: "singlepage"
---
```

### 2. Hugo output manipulation is difficult.

Hugo's default output options are fantastic. They do everything they should! But as soon as your ideal output content differs from the default options they provide, you're straight out of luck.

This happened to me on many occasions where the output that Hugo provided wasn't enough.
Here's an example: I wanted to output raw escaped HTML in my Atom content feed but Hugo would refuse to escape the necessary symbols. I ended up with this atrocity:

```xml
<content type="html">
  {{ .Content | htmlUnescape | safeHTML | htmlEscape }}
</content>
```

If that wasn't enough, I also had to run a special command to format the output every time I built the site:

```sh
sed -i -e "s/&amp;/\&/g" $(OUTPUT)/feed.xml
```

It would be nice if Hugo allowed some form of scripting in raw Golang to handle edge cases to manipulate content, but that isn't a capability at the time of this writing.

### 3. Hugo shortcodes are hacks.

Hugo provides *shortcodes* out of the box which allow users to insert Hugo scripting functionality into a markdown content file. Nonetheless, they still require finessing to fit specific needs. Let me explain.

I wanted the ability to insert raw HTML tags such as `<video>` and `<audio>` to be able to upload videos to my website. The shortcode is simple enough, but it almost feels like an unnecessary abstraction:

```md
# in shortcodes/rawhtml.html:

{{ .Inner }}

# in mycontent.md:

{{<rawhtml>}}
<video height="700" controls>
  <source src="someFile.mp4" type="video/mp4" />
  Sorry, your browser does not support embedded video.
</video>
{{</rawhtml>}}
```

> I understand there are security concerns for raw HTML injection into content but it shouldn't require a custom shortcode. This feature seems pretty standard to most SSGs.

I also ended up creating custom shortcodes for all of my special content collections that couldn't adhere to the default templating. This ended up being empty markdown files with a single shortcode containing all necessary HTML.

```md
---
title: "Shows"
description: "Cartoons, TV shows, podcasts, and episodic films"
---

{{<showlist>}}
```

### 4. Whitespace in Hugo is tricky.

When working with conditionally displayed content, it's tricky to know how to handle the whitespace between texts. This was nearly impossible with whitespace-sensitive content like gemtext. In many cases, I would quizzically change the presence of the dash and brackets randomly to attempt to get the spacing between texts just right. It became a guessing game of "do I put the dash here or here?":

```md
{{- end }}{{ with .Params.spotify }}
=> {{ . }} Spotify
{{- end }}{{ with .Params.youtube }}
=> {{ . }} Youtube
{{- end }}
```

At the end of the day, I realized that Hugo was not a maintainable solution for the future of my website if I wanted to continue adding new content. I decided that I would go back to the drawing board and look for a simpler solution.

## Website Builder Criteria

In order to find a good replacement for Hugo, I first noted my requirements, then narrowed all my options. My requirements for a website builder were as follows:

* **Content should be kept in markdown.** Markdown is a universal format for writing simple static blog content and I don't want that to change. I jot down notes, journals, poems, and all sorts of things in markdown, and I'd like my blog to stay the same.
* **Client-side JavaScript should not be required if the page does not display dynamic content.** A user should be able to disable JavaScript or any scripting on the pages of my website unless I am specifically demonstrating a JavaScript feature or some WebGL content. Who knows, I might demonstrate some HTML canvas art in the future...
* **I should be able to make custom pages whenever and wherever I want.** I never realized how valuable this is until I was restricted with where I could put pages in Hugo. If I own the website, I should be able to make random pages with any url that I want.
* **I do not want a server to run by default.** A lot of website builders nowadays rely on some NodeJS or PHP server running in the background fetching and curating content. I prefer to keep my website as plain as possible - just raw HTML and CSS like the olden days!

This criteria helped me narrow down my options very quickly. A lot of popular JS frameworks like Create React App, Svelte, NextJS, and Solid Start were immediately eliminated due to their initial client JavaScript bundle. I just hate seeing blank pages with stuff like this if I disable JavaScript.

![a blank website saying "You need to enable JavaScript to run this app."](https://cdn.bossley.xyz/files/thoughts/23/astro-no-client-javascript.png)

Because I removed Gemini content from my site a few months ago, it also gave me the creative freedom to only allow a single type of output content, allowing me to narrow the options further. In the end, I landed on the the first builder that met all criteria: Astro.

## Motivation (Why Astro?)

[Astro](https://astro.build/) is a JavaScript website framework designed to build with no client JS by default. It also builds in static mode but can be configured to support SSR. This website builder has been amazing to work with so far for many reasons:

### 1. Astro is a JavaScript framework.

I know some people might have polarizing opinions about this topic but I absolutely love JavaScript frameworks. They're extremely simple in syntax and the templating is so intuitive. It also helps reduce structure duplication via common components. Plus, you can add JS scripting wherever you want. Don't like the output format of your content? Just write an inline script for it!

```jsx
<li>
  <a href={url}>
    <span>{title}</span>
    <time dateTime={date.toISOString()}>{date.toDateString()}</time>
  </a>
</li>
```

### 2. Astro uses a filesystem-based router.

[NextJS first started the trend of using files to represent individual website routes](https://nextjs.org/docs/basic-features/pages) and Astro supports it as well! This is a wonderful feature because it makes organizing pages and content very easy. It also makes adding new content much easier to prevent website path conflicts or generating collections of pages.

```
pages/
  * index
  * thoughts/
    * [...pages]
    * [...slug]
  * recs/
    * index
```

### 3. Astro has first-class TypeScript/Zod support.

I'm a firm believer in strongly-typed languages (if I had my way we'd all be coding in C99) because it catches bugs and obvious errors at compile/build time. TypeScript is a great compromise of simple syntax scripting with safer typing and should be the default for all web frameworks. Astro provides support for TypeScript out of the box in addition to Zod, a data schema validation library. Using Zod I was able to type all of my data files and frontmatter and actually caught a few bugs in the process.

```ts
const ratingSchema = z.number().gte(-1).lte(10)
const dateSchema = z.string().regex(/\d\d\d\d/)
const currentSchema = z.literal(true).optional()

export const storyListSchema = z.array(
  z.object({
    type: z.literal('story'),
    author: z.string(),
    title: z.string(),
    url: z.string().url(),
    date: dateSchema,
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  })
)
export type StoryList = z.infer<typeof storyListSchema>
```

### 4. Astro allows custom page/API paths.

Astro allows you to create auto-generated content of any filetype or format and can generate simple API routes in SSR from a `get` function in a script in the `pages/` directory:

```ts
export async function get() {
  return { body: 'Hello world!' }
}
```

It allowed me to easily generate an Atom feed with HTML content for my website without having to worry about formatting:

```ts
const parser = new MarkdownIt()

export async function get() {
  const items: AtomFeed['items'] = posts.map(({ data, body }) => {
    const { title, date } = data
    return {
      title,
      permalink: BASE_URL + getPermalink({ title, date }),
      date,
      content: parser.render(body),
    }
  })

  const feed: AtomFeed = {
    title: 'my feed',
    subtitle: 'subscribe to my atom feed below',
    feedUrl: 'https://example.com/feed.xml',
    siteUrl: 'https://example.com',
    copyright: 'some legal copy',
    name: 'John Doe',
    email: 'johndoe@example.com',
    items,
  }
  return { body: genAtomFeed(feed) }
}

```

## Conclusion

I've already converted this website over from Hugo to Astro. From your perspective, nothing will have changed. This migration won't affect anything on my website... it will just make me much happier when I add new content :)

As always, you can [view the source code for my website's development branch here](https://github.com/bossley9/website/tree/dev).
