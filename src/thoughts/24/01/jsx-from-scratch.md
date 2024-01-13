---
title: "JSX From Scratch"
description: "How to build your own JSX implementation."
date: 2024-01-13T14:29:00-04:00
tags:
  - "thought"
  - "tech"
  - "frontend"
---

[React](https://react.dev) is a fantastic frontend library allows you to embed JavaScript logic in HTML using a custom HTML-like syntax called *JSX*. Consider the following JSX:

```jsx
function MyComponent({ name }) {
  return (
    <>
      <p>Hello {name}.</p>
      <p>What is 2 + 2?</p>
      <p>Here is the answer:</p>
    </>
  )
}

export default function() {
  return (
    <div>
      <MyComponent name="Sam" />
      <p>{2 + 2}!</p>
    </div>
  )
}
```

When executed or compiled, this code will emit the following HTML:

```html
<div>
  <p>Hello Sam.</p>
  <p>What is 2 + 2?</p>
  <p>Here is the answer:</p>
  <p>4!</p>
</div>
```

Not only does this make HTML document writing easier, it allows you to succinctly create reusable components and perform complex value calculations on-the-fly. It's unsurprising that practically every modern frontend framework copies this pattern in 2024.

As much as I love the simplicity and composability of JSX, there are a few downsides that always stop me from using the React library in my personal projects:

1. **It's heavy**. Because it includes logic for server fetching and hooked logic, it's 316 kB.
2. **It's owned by Facebook**. Yeah, it's open source, but Facebook still controls the direction of the library.
3. **It diverges from standard HTML syntax**. Some native HTML element attributes are modified to not conflict with React internals (for example, `class` becomes `className` and `datetime` becomes `dateTime`) which make it confusing to switch between JSX and native HTML.

After side-stepping the library in multiple projects, I began wondering if I could implement my own custom version of React's JSX to include only the parts I wanted.

And that's what I did! Here is how to build your own JSX implementation from scratch.

## Compilation

We first need to understand how JSX is parsed under the hood. After all, it's far from standard JavaScript syntax. JSX is purely [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar). It looks like XML, but when parsed by React, it's transformed into plain JS functions using "factory" functions. Every component you write will transform into something like the JS function below:

```js
_jsxs("div", { children: null }, "1")
```

The core of our custom React library will be the implementation of these factory functions. If you use Deno or TypeScript, these transformations are provided out of the box so you only need to worry about the factories.

To start, we need to set these TypeScript compiler settings:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

This tells the TypeScript compiler two things:

1. We don't want to immediately create DOM elements from the JSX, we just want to transform the JSX to plain JS first to execute.
2. We will be using the namespace `react` to contain our factory functions. This means the compiler will look for our factories in the `react/jsx-runtime` import. If you're using Deno, you will need to reroute this to a local file:
    ```json
    {
      "imports": {
        "react/jsx-runtime": "./react.ts"
      }
    }
    ```

## The Factories (jsx and jsxs)

Next, we need to implement the "factory" functions - the "meat and potatoes" of JSX. There are three factories we need to implement:

* `jsx` - a function defining how to handle DOM elements or components
* `jsxs` - a function defining how to handle DOM elements or components with multiple children
* `Fragment` - a function defining how to handle [fragments](https://react.dev/reference/react/Fragment)

In practice we can generalize and treat the `jsx` and `jsxs` cases with the same function. Let's start with the function signatures.

```ts
type JSXProps = {
  children: unknown | unknown[];
  [k: string]: unknown;
};

export function jsx(
  tag: unknown,
  props: JSXProps,
  _key?: string
): string {
  // ...
}

export const jsxs = jsx;

export function Fragment(props: JSXProps): string {
  // ...
}
```

The `jsx` function takes in three total parameters:

1. The tag name or function
2. The tag's props (this is where `children` are also defined)
3. An optional `key` for signifying unique components

We're returning type `string` for all factories because we want to compile the JSX to stringified HTML and output that HTML into a file. We can copy the `jsx` implementation for `jsxs` as mentioned earlier.

The fragment factory is much simpler. Since fragments are not elements themselves, we only take in one parameter for props.

The plan is to implement a static building of JSX components so we won't try to worry about `key`. Instead, we'll try to render components based on `tag` and `props`. We first need to determine what type of component we're dealing with.

```ts
export function jsx(
  tag: unknown,
  props: JSXProps,
  _key?: unknown,
): string {
  if (typeof tag === "function") {
    // the tag is a custom component
  } else if (typeof tag === "string") {
    // the tag is a native HTML element
  } else {
    // invalid invocation, return nothing
    return "";
  }
}
```

If `tag` is a function, this is a custom component built with JSX. Otherwise, the tag will be the name of a native HTML element such as `"div"` or `"span"`. The implementation for custom components is very basic since components are functions under the hood, fortunately.

```ts
if (typeof tag === "function") {
  // the tag is a custom component
  tag(props);
}
```

The more complex implementation is dealing with native HTML elements. First, we need to format our prop object as a string of HTML attributes.

```ts
const attrs = Object.entries(props).reduce<string[]>(
  (acc, [key, value]) => { // 1
    if (key === "children") {
      // 2
    } else if (typeof value === "boolean") {
      // 3
      if (value) {
        acc.push(`${key}`);
      }
    } else {
      // 4
      acc.push(`${key}="${value}"`);
    }
    return acc;
  },
  [""], // 5
).join(" "); // 6
```

There's a lot going on here. Here's what's happening:

1. `props` are currently returned as a key-value JS object but we want to generate a string of attributes so we're using `reduce`.
2. `props.children` is a special attribute in JSX signifying the children of the component so we should ignore that attribute. It's not used by any native HTML elements so we won't run into conflicts.
3. We need to handle boolean attributes carefully. If we have a JSX attribute like `download={true}` we want just the attribute name `download` in the final HTML. Otherwise, if a JSX attribute is false like `download={false}`, we'd like to omit it entirely.
4. Push the key-value pairs into an array of attribute strings.
5. The first element is an empty string so that when we join the attributes, it creates a string with a left-padded string.
6. Append all the attributes into a single string with spaces in between.

In the end, this reducer converts a JS object like this:

```ts
const props = {
  href: "https://example.com",
  download: true,
  test: false,
  id: "test"
};
```

Into this:

```ts
const attrs = ` href="https://example.com" download id="test"`
```

Next, we need to format the tag itself. We might consider an implementation like `<${tag}${attrs}>${props.children}</${tag}>` but we also need to account for self-closing or *void* tags. As chance would have it, [there is an established list of HTML tags that will always be void](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) so we don't need to worry about handling tags on a case-by-case basis.

```ts
const VOID_TAGS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

return VOID_TAGS.includes(tag)
  ? `<${tag}${attrs}>`
  : `<${tag}${attrs}>children here</${tag}>`;
```

Now we will look into handling how to render fragments in addition to children as both are handled in similar ways.

## The Factories (Fragment and children)

Fragments and children both handle a collection of any number of child elements, so we can use nearly identical functionality for each. We will first create a helper function `appendChild` to parse children.

```ts
function appendChild(child: unknown): string {
  // 1
  if (child === false || child === null || child === undefined) {
    return "";
  }

  // 2
  if (Array.isArray(child)) {
    return child.map(appendChild).join("");
  }

  // 3
  return String(child);
}
```

The logic is straightforward:

1. If the child object is "falsy" [according to how React defines "falsy" elements](https://react.dev/learn/conditional-rendering#logical-and-operator-), ignore it and return empty. **Note that this is not the same as JavaScript falsy**.
  > React considers false as a “hole” in the JSX tree, just like null or undefined, and doesn’t render anything in its place.
  > Don’t put numbers on the left side of &&.
2. Children can either refer to a single child element or an array of multiple child elements. In the case of the latter, we should map over each child and recursively apply the same rules.
3. Otherwise, in the case of a single child, we can return a stringified value.

The fragment factory uses the same logic but with different props:

```ts
export function Fragment(props: JSXProps) {
  return appendChild(props.children);
}
```

That's the last of the logic we need to make this work!

## Element Typing

Although we may have a functional JSX interpreter, TypeScript still doesn't know how to read HTML in JS. To allow that to happen, we need to extend the existing element definitions with our own type declaration file. Create a `react.d.ts` file to mirror the `react.ts` implementation file:

```ts
declare namespace JSX {
  interface Element {
    [attribute: string]: string | number | boolean;
  }
  interface IntrinsicElements {
    [elemName: string]: Element;
  }
}
```

Here we are declaring general types for HTML elements and their attribute types. You can get very specific with [the official React types](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) but these are simple enough to work.

## The Final Product

Let's put all of this together. We first [set up TypeScript](#compilation) to point to specific "factory" functions when parsing JSX. Next, we implemented the [jsx and jsxs factory functions](#the-factories-jsx-and-jsxs) to handle our components. Then we implemented the [Fragment factory function](#the-factories-fragment-and-children) to handle fragments and children. Finally, we created our own [JSX type declaration file](#element-typing) to let TypeScript read JSX. This is the very core of how JSX works.

Putting all of this together, you can very quickly create your own JSX static site generator. Here is a simple example I've created that compiles a basic TSX file to HTML.

[jsx.diff](https://cdn.bossley.xyz/files/thoughts/24/jsx.diff)

If you'd like a more involved example, [I currently use this JSX implementation via Lume to build this website you're reading.](https://github.com/bossley9/website/blob/dev/plugins/react.ts)

What's great about this JSX implementation is that it has almost no footprint. Compare our 1.8 kB unminified implementation with Facebook's 316 kB minified React implementation. If you only need a JSX compiler with none of the bells and whistles, this is for you.

## Conclusion

This was a lot of fun to research and implement. I ended up with a fantastic solution that works wonderfully for my needs.

There are some fantastic resources I used to help me with this article. I highly recommend reading [Facebook's original RFC for refactoring React.createElement](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md), [TypeScript's jsx configuration documentation](https://www.typescriptlang.org/tsconfig#jsx), and [Configuring JSX in Deno](https://docs.deno.com/runtime/manual/advanced/jsx_dom/jsx).
