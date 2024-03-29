---
title: "Typing Object Prototype Methods in Typescript"
description: "How to better type Object prototype methods in Typescript"
date: 2022-07-11T17:04:00-07:00
tags:
  - "thought"
  - "typescript"
---

Properly typing anything in Typescript can be a huge pain, especially when it pertains to Javascript builtins. I ran into an issue today where I discovered Object.keys and Object.entries weren't returning the correct types I wanted.

## Problem

Pretend we have an object like the one below:

```ts
const obj: Record<number, string> = {
  0: "Hello",
  1: "World!",
}
```

Object.keys returns an array of all keys in a given object. In the example above, Object.keys(obj) returns [0, 1]. It only makes sense that the type of this result should be of type number[], right?

```ts
const x = Object.keys(obj) // const x: string[]
```

Why are the keys conforming to a string type? We would expect Object.keys to return keyof T, but it instead returns string. Is this a bug with Typescript?

## Rationale

Believe it or not, this is actually intended behavior in Typescript. The issue with assuming keyof T as the return type of Object.keys is that keyof T does not necessarily represent an exhaustive list of keys. Take the following valid Typescript example:

```ts
interface Database {
  x: string
  y: string
}

function run(k: keyof Database) {
  if (k === "x") {
    // do something with x
  }
  else if (k === "y") {
    // do something with y
  }
  else {
    // no other key should exist
  }
}
```

If we extend this interface, we run into issues because keyof is not exhaustive.

```ts
interface Box extends Database {
  z: string
}

const data: Box = {
  x: "Hello",
  y: "World!",
  z: "Illegal!",
}

run(data) // uh-oh! z breaks everything!
```

Because keyof T does not and cannot possibly represent an exhaustive list of keys, Typescript instead declares Object.keys and other similar Object prototype methods to return keys of type string.

[https://github.com/microsoft/TypeScript/issues/35101](https://github.com/microsoft/TypeScript/issues/35101)

## Solution

Since the type of Object prototype methods is semantically correct, is there a workaround for better typing on objects?

I'm glad you asked!

We can write utility functions to substitute Object prototype method types using type casts. Typescript natively provides a PropertyKey type representing any object key type (it literally translates to `string | number | symbol`). We can utilize PropertyKey to write type casts for any builtin methods that coerce key types to strings.

```ts
const getObjectKeys = Object.keys as <T extends Record<PropertyKey, any>>(obj: T) => (keyof T)[]

const getObjectEntries = Object.entries as <T extends Record<PropertyKey, any>>(obj: T) => [keyof T, T[keyof T]][]
```

Now we have "better" typing:

```ts
const obj: Record<number, string> = {
  0: "Hello",
  1: "World!",
}

const x = Object.keys(obj)   // const x: string[]
const y = getObjectKeys(obj) // const y: number[]

const a = Object.entries(obj)   // const a: [string, string][]
const b = getObjectEntries(obj) // const b: [number, string][]
```
