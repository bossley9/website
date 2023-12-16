---
title: "TypeScript Foundations"
description: "Learn about the fundamentals and core essentials of TypeScript: what it is, why we use it, and explaining the basic language concepts."
date: 2023-11-06T19:44:00-04:00
tags:
  - "thought"
  - "frontend"
  - "tech"
  - "typescript"
  - "talk"
---

> This is a simplified transcription of a talk I gave on the latest version of TypeScript (5.2).

Today I will be talking about TypeScript Foundations and explaining the core building blocks of TypeScript. I'll be explaining what TypeScript is, why we use it, and explaining some of the basic language concepts that we apply to our code. You might be thinking, *"I already understand TypeScript. It's a typing language with simple syntax"*, but I assure you that TypeScript is more than meets the eye. A strong foundation is critical for understanding any programming language, TypeScript included. It is always beneficial to go back to the core foundations of a language. My goal with this talk is to reinforce your knowledge of TypeScript concepts and hopefully teach you something new. If you would like to follow along, I will keep a [worksheet here for reference](https://sam-bossley-us-media.sfo3.cdn.digitaloceanspaces.com/thoughts/2023/typescript-foundations-worksheet.ts).

I want to clarify that this will not be an extensive guide of every aspect of the TypeScript language. I will instead only focus on the most important syntaxes, rules, and utilities.

Let's become TS experts, shall we?

## Table of Contents

1. [What is TypeScript?](#what-is-typescript)
2. [Type Declarations](#type-declarations)
3. [Type Declarations Continued: Object Types](#type-declarations-continued-object-types)
4. [Type Declarations Continued: Combining Types](#type-declarations-continued-combining-types)
5. [Type Declarations Continued: Any, Unknown, and Never](#type-declarations-continued-any-unknown-and-never)
6. [Type Declarations Continued: Creating Types from Types](#type-declarations-continued-creating-types-from-types)
7. [Type Inference](#type-inference)
8. [Type Assertion](#type-assertion)
9. [Type Generics](#type-generics)
10. [Type Generics Continued: Utility Types](#type-generics-continued-utility-types)
11. [Immutability](#immutability)
12. [Literal Types and Constant Assertions](#literal-types-and-constant-assertions)
13. [Type Narrowing](#type-narrowing)
14. [Common Pitfalls](#common-pitfalls)
15. [Resources](#resources)

## What is TypeScript?

What then, is TypeScript? *TypeScript* (TS) is a **statically-typed** extension of JavaScript (JS) with a **structural type system** ([we'll talk more about this later](#structural-typing)). Because TypeScript is statically-typed, it allows us to have relative type safety at build time in an otherwise untyped language.

In vanilla JavaScript, it's trivial to misuse functions and produce bugs:

```js
function addFourToNumber(x) {
  return x + 4;
}
addFourToNumber('five'); // valid
```

However, with TypeScript, we can reduce the possibility of bugs by catching obvious errors at compile time.

```ts
function addFourToNumberTyped(x: number) {
  return x + 4;
}
addFourToNumberTyped('five'); // error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

However, is important to understand exactly what TypeScript is and is not. TypeScript **IS NOT**:

* inherently "type safe"
* a code optimizer/minifier

However, TypeScript **IS**:

* a "safer" typing mechanism
* a code confidence booster
* a form of testing

A TypeScript file does not indicate perfect type safety, but it can give us increased confidence in the code we write. I'll reiterate this point in further detail and provide examples as we go.

## Type Declarations

TypeScript provides many standardized builtin types out of the box called *primitive types*. Some of the more common primitive types include `string`, `number`, `boolean`, `null`, `undefined`, `any`, `never`, and `unknown`.

We can utilize these primitive types to statically type any variable when we declare them. These are called *type declarations*.

```ts
const myTypedVar: number = 5;
const varTypedAsString: string = "hello";
let myUndefinedVariable: undefined;
const myArray: number[] = [23, 56, 6];
```

This includes variables that might have multiple types of values assigned to them. We call these types *union types*.

```ts
const couldAlsoBeNumber: string | number = "hello";
const couldAlsoBeString: string | number = 2;
const specificStringName: "hello" | "world" | "test" = "test";
```

We can even create our own named types using the `type` keyword:

```ts
type CustomUnionType = number | null;

const myMaybeNull: CustomUnionType = 3;
const myMaybeNumber: CustomUnionType = null;
```

## Type Declarations Continued: Object Types

Perhaps one of the more important aspects of TypeScript is its ability to type object properties.

We can create a new object type by listing the types as key values similar to a standard JS object:

```ts
type MyObjectType = {
  prop1: boolean;
  prop2: string;
  prop3: null;
  superSecretData: number;
};

const ObjectThatIsTyped: MyObjectType = {
  prop1: false,
  prop2: "hello",
  prop3: null,
  superSecretData: 42,
};
```

> The `interface` keyword can also be used to type object keys, but I strongly recommend against using it unless you know what you're doing because [interfaces can be redeclared and overwritten](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

Furthermore, we can make object keys optional with the *optional operator*:

```ts
type OptionalPropObjectType = {
  isValid: boolean;
  type: string;
  metadata?: number[]; // optional
};

const optionalIncluded: OptionalPropObjectType = {
  isValid: true,
  type: "square",
  metadata: [],
};
const optionalExcluded: OptionalPropObjectType = {
  isValid: true,
  type: "circle",
};
```

It is important to keep in mind that optional properties are different from undefined property types:

```ts
type OptionalVsUndefinedType = {
  prop1?: boolean; // this property can be omitted entirely
  prop2: boolean | undefined; // this property is required but its value can be undefined
};

const myInvalidOptionalObj: OptionalVsUndefinedType = {}; // error: Property 'prop2' is missing in type '{}' but required in type 'OptionalVsUndefinedType'.
const myValidOptionalObj: OptionalVsUndefinedType = { prop2: undefined };
```

If all keys and values should be the same type, TS provides special syntaxes:

```ts
type BoolMap = { [x: string]: boolean };
type BoolMapAlt = Record<string, boolean>; // we will talk about this alternative syntax later in Type Generics

const settings: BoolMap = {
  isValid: true,
  hasConfig: false,
};
const settingsAlt: BoolMapAlt = {
  isValid: true,
  hasConfig: false,
};
```

## Type Declarations Continued: Combining Types

We can combine types together to create new types called *intersection types*.

```ts
type FirstObjectType = { data: string };
type SecondObjectType = { metadata: number };
type BothObjectsType = FirstObjectType & SecondObjectType;

const bothObjects: BothObjectsType = {
  data: "hello",
  metadata: 55,
};
```

When the intersection of two types result in conflicting properties, the properties themselves intersect one another. Usually this results in a property of type `never`.

```ts
type StringDataType = {
  data: string;
};
type NumberDataType = {
  data: number;
};
type ConflictingDataType = StringDataType & NumberDataType;
type IntersectedDataType = ConflictingDataType["data"]; // type is 'never'

type AnotherConflictingDataType = string & null; // type is 'never'
```

## Type Declarations Continued: Any, Unknown, and Never

In addition to implementing builtin JavaScript types, TypeScript also provides a few brand new types: `any`, `unknown`, and `never`. Let's look at how to use each.

`any` is a type that represents "any" variable type. It can be used in place of any other TypeScript type and can be used in any scenario, including accessing properties, invocation as a function, and assigning a new value. At a high level, if you were to replace all types in a TS file with `any`, it becomes a JS file! It can even be assigned to explicitly typed variables, giving the illusion of a strongly typed value.

```ts
let neverDoThis: any = "hello world";
neverDoThis(); // no TS error
neverDoThis = 55; // no TS error
neverDoThis[8] = 47; // no TS error
const thisVarIsIncorrect: number = neverDoThis; // no TS error
const thisVarIsAlsoIncorrect: () => void = neverDoThis; // no TS error
```

***For this reason, `any` should never be used in a production environment when `unknown` can be applied instead***.

`unknown` is a safer type alternative that is semantically identical to `any` but its value cannot be accessed or coerced without type assertions.

```ts
let unknownIsOk: unknown = "hello world";
unknownIsOk(); // error: 'unknownIsOk' is of type 'unknown'.
unknownIsOk = 55; // assignment is allowed
unknownIsOk[8] = 47; // error: 'unknownIsOk' is of type 'unknown'.
const thisVarThrowsAnError: number = unknownIsOk; // error: type 'unknown' is not assignable to type 'number'.
```

A great usage of `unknown` is in error handling and API response parsing to ensure the structure of an external data source.

```ts
try {
  // some async action
} catch (error: unknown) {
  console.log(error.message); // error: 'error' is of type 'unknown'.

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      console.log(error.message); // type is 'string'
    }
  }
}
```

`never` is a type that represents the absence of a type. This is different from `null`, which represents the absence of a value. This type is useful to indicate when a value should never be used or manipulated in any way. `never` is also used when TypeScript cannot infer the type of strictly typed value (we'll explain type inference in more detail later). This type is rarely declared and is most often inferred in cases such as the one below:

```ts
function normalizeValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value); // type is 'string'
  } else if (typeof value === "number") {
    console.log(value); // type is 'number'
  } else {
    console.log(value); // type is 'never'
  }
}
```

## Type Declarations Continued: Creating Types from Types

We can also create types based on existing types and values:

```ts
type DataObject = {
  settingList: boolean[];
  name: string;
  isValid: boolean;
};
type BinaryArray = DataObject["settingList"]; // type is 'boolean[]'
type DataKeys = keyof DataObject; // type is '"settingList" | "name" | "isValid"'

const myNormalString: string = "hello world";
type NormalStringType = typeof myNormalString; // type 'string'
```

## Type Inference

If you're coming from JavaScript, adding a type declaration to every variable declaration would be more of a burden than a benefit. Fortunately, the TypeScript compiler also can infer, or presume, the type of a variable through *type inference* based on its surrounding context. For example, if a function returns a value of type number, TS can reasonably infer that the variable it assigns that value to will also be of type number.

```ts
// we will revisit some of these cases later
const myInferredNumber = Number("452"); // type is 'number'
const myInferredBoolean = true; // type is 'true' - assume this is 'boolean' for now
const myConstNum = 4; // type is '4' - assume this is 'number' for now
const names = ["james", "jim", "mike", "sarah"]; // type is 'string[]'
const someNullValue = null; // type is 'null'

const multiTypeArray = ["hello", 32]; // type is '(string | number)[]'
const possiblyNumberVar = Number("300") || null; // type is 'number | null'
const possiblyStringVar = possiblyNumberVar ?? "hello"; // type is 'number | "hello"' - assume this is 'number | string' for now

if (typeof possiblyNumberVar === "number") {
  console.log(possiblyNumberVar); // type is 'number'
}
```

## Type Assertion

In some rare cases, we need the ability to coerce the type of a variable to a specific type definition. This can be done with *type assertion* using the `as` keyword to change the type of a variable. This is not the same as a "type cast" or "casting" from traditional object-oriented programming languages because type assertions are made at compile time and do not affect runtime behavior.

```ts
type MyFilledDataObject = {
  isValid: boolean;
  title: string;
};
const badPracticeObjectCast = {
  isValid: true,
} as MyFilledDataObject; // type is 'MyFilledDataObject'
```

***I strongly discourage type assertion because it can incorrectly manipulate types. Chaining type assertions can result in even worse outcomes.***

```ts
const reallyBadPracticeDontDoThis = {
  whateverIWant: true,
} as unknown as number; // type is 'number'
```

***Type assertion is never recommended in production environments because it forcibly overwrites the type of a variable.***

## Type Generics

*Type generics* are types that are parameterized, or depend on their inputs. Generics allow you to create types that can have different implementations.

```ts
type Maybe<T> = T | null;

const maybeNumber: Maybe<number> = 7; // type is 'number | null'
const maybeString: Maybe<string> = null; // type is 'string | null'

type GenericObj<T> = { data: T };

const numberData: GenericObj<number> = { data: 42 }; // type is '{ data: number }'
const undefinedData: GenericObj<undefined> = { data: undefined }; // type is '{ data: undefined }'
```

You can declare any number of generic parameters, refine the scope of parameters with *extends*, and even declare default parameter types.

```ts
type GenParams<X, Y extends string, Z = number> = {
  data: X;
  metadata: Y | undefined;
  props?: Z[];
};
```

## Type Generics Continued: Utility Types

TypeScript provides a few builtin generics called *utility types* that help when typing unique cases of variables.

The `Promise<T>` and `Awaited<T>` generics can be used to type promises and awaited promises respectively.

```ts
async function getData() {
  const promises: Promise<unknown>[] = [
    Promise.resolve(1),
    Promise.resolve(2),
  ];
  const results: Awaited<unknown>[] = await Promise.all(promises);
  return results;
}
```

The `Partial<T>` generic can be used to make all object properties optional. Similarly, the `Required<T>` generic will make all object properties required.

```ts
type LargeObjectType = {
  title: string;
  count: number;
  flags: string[];
};
const smallerObject: Partial<LargeObjectType> = {
  title: "hello",
};

type OptionalObject = {
  title: string;
  notRequiredString?: string;
};
const makePropsRequired: Required<OptionalObject> = {
  title: "something",
}; // error: Property 'notRequiredString' is missing in type '{ title: string }' but required in type 'Required<OptionalObject>'.
```

Similar to the `Required<T>` generic, the `NonNullable<T>` generic can be used to make individual values required.

```ts
type NonNullString = NonNullable<string | null | undefined>;

const undefinedString: NonNullString = undefined; // error: Type 'undefined' is not assignable to type 'string'.
const nullString: NonNullString = null; // error: Type 'null' is not assignable to type 'string'.
```

The `Record<K, V>` type we introduced earlier is actually a generic with two parameters!

```ts
const flags: Record<string, boolean> = {
  someSetting: true,
  anotherOne: false,
};
```

The `Pick<T, Keys>` and `Omit<T, Keys>` generics can be used to specifically select or omit object properties to create a new object.

```ts
type BigObjectType = {
  data: number[];
  location: string;
  nested: {
    copy: boolean;
  };
};

type DataOnly = Pick<BigObjectType, "data">;
const bigDataObject: DataOnly = {
  data: [1, 5],
};

type LocationOnly = Omit<BigObjectType, "data" | "nested">;
const bigLocationObject: LocationOnly = {
  location: "San Francisco",
};
```

The `ReturnType<T>` returns the type of the return value of a function. Similarly, `Parameters<T>` returns an array of the parameter types of a function.

```ts
function stringifyAddition(n1: number, n2: number) {
  return String(n1 + n2);
}

type ReturnVal = ReturnType<typeof stringifyAddition>;
type Arg1 = Parameters<typeof stringifyAddition>[0];
type Arg2 = Parameters<typeof stringifyAddition>[1];
```

There are [plenty of other utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html#handbook-content) but these are the most widely used.

## Immutability

In JavaScript, practically everything is mutable, meaning it can be overwritten or reassigned without your knowledge.

```ts
type ImportantObject = {
  data: string;
};

const myUnsafeImportantObj: ImportantObject = {
  data: "secureInfo",
};
const unsafeDataTable: number[] = [42, 999, 7];
function insecureFunction() {
  myUnsafeImportantObj.data = "hackdlol";
  unsafeDataTable.push(4);
}
insecureFunction(); // your data just changed!
```

To prevent this from happening, TypeScript provides `readonly` utilities to prevent this.

```ts
type SafeImportantObject = {
  readonly data: string;
};

const mySafeImportantObj: SafeImportantObject = {
  data: "secureInfo",
};
const safeDataTable: readonly number[] = [42, 999, 7];

function secureFunction() {
  mySafeImportantObj.data = "hackdlol"; // error: Cannot assign to 'data' because it is a read-only property.
  safeDataTable.push(4); // error: Property 'push' does not exist on type 'readonly number[]'.
}
secureFunction();
```

## Literal Types and Constant Assertions

In some cases, it's useful to be able to use the literal value of a variable in TypeScript.

```ts
const data: Record<string, number> = {};
// can we restrict the type of `key` to only be possible keys instead of any string?
function getCollection(key: string) {
  return data[key];
}

// can we make SecondElemType to return type 'number' instead of 'string | number'?
const mixedArr = ["hello", 42];
type SecondElemType = typeof mixedArr[1];
```

TypeScript provides a way to specify primitive types even further into *literal types*. You can think of some primitive types such as `string` and `number` as a large type union of literal types:

```ts
type string = 'a' | 'b' | 'c' | ... | 'aa' | 'ab' | 'ac' | ... | 'hello world' | ...
type number = 1 | 2 | 3 | ... | 11 | 12 | 13 | ... | 1.1 | 1.2 | 1.3 | ...
```

We can use these individual types to apply precise typing to our variables:

```ts
const helloStr: "hello" = "hello";
const falseValue: false = false;
const theAnswerToLife: 42 = 42;
```

These literal types are some of the examples we saw earlier in [type inference](#type-inference). By themselves, literal types aren't very useful. However, when we combine them, we can increase the specificity of our types with pinpoint accuracy.

```ts
export function getCollectionTyped(
  key: "furniture" | "electronics" | "laundry",
) {
  // some logic
}

function dateSorter(a: Date, b: Date): -1 | 0 | 1 {
  // some logic
  return 0;
}
```

We can also extract the literal value of a generally-typed variable using *constant assertions*:

```ts
const keyName = "John";
const keyUserID = 42;
const queryKey = [keyName, keyUserID] as const;

const name = queryKey[0]; // type is 'John'
const userID = queryKey[1]; // type is '42'
```

## Type Narrowing

In many cases TypeScript can infer the type of a variable based on its surrounding conditions. This is called *type narrowing*:

```ts
function parseCSSPropertyValue(value: number | string) {
  if (typeof value === "number") { // called a "type guard"
    console.log(value); // type is 'number'
  } else {
    console.log(value); // type is 'string'
  }
}
```

While TypeScript typically excels at type narrowing, it doesn't always infer the type you desire and understand its surrounding context. In some cases we need to *narrow* types to get the specific types we want.

Here we can use a *type predicate* using the `is` operator to create a conditional type return for a function:

```ts
const myStringTable: (string | undefined)[] = [
  "hello",
  "",
  undefined,
  "something",
];

// TypeScript complains here - there's no guarantee
// this filter removes all undefined values
const myValidStringTable: string[] = myStringTable.filter((item) =>
  Boolean(item)
);
// success!
const myRealValidStringTable: string[] = myStringTable.filter(
  (item): item is string => Boolean(item),
);
```

## Common Pitfalls

TypeScript is not without its own gotchas and quirks. Here are a few pitfalls of TypeScript.

### Structural Typing

As mentioned previously, TypeScript uses a *structural type system*. What this means is that TypeScript types by structure but not necessarily by object. In traditional object-oriented programming languages, classes are their own type without overlap except through inheritance or polymorphism. Structural typing is different. Structural typing only checks and matches structure. The best way to think of it is like this: "if it quacks like a duck, it's a duck!".

```ts
type Cat = {
  isMeowing: boolean;
};
type Dog = {
  isBarking: boolean;
};
type Animal = Cat | Dog;

const catAndDogHybrid: Animal = {
  isMeowing: true,
  isBarking: true,
}; // valid TS
```

In this example it is possible to be both a `Dog` and a `Cat` because the structure matches. It also presents itself as a problem when typing anonymous objects.

```ts
const anonymousCatAndDogHybrid = {
  isMeowing: true,
  isBarking: true,
};

const cat: Cat = anonymousCatAndDogHybrid; // valid TS
const dog: Dog = anonymousCatAndDogHybrid; // valid TS
```

The best way to avoid this is with an optional `never` to ensure exclusivity between type union elements.

```ts
type SafeCat = {
  isMeowing: boolean;
  isBarking?: never;
};
type SafeDog = {
  isMeowing?: never;
  isBarking: boolean;
};
type SafeAnimal = SafeCat | SafeDog;

const safeCatAndDogHybrid: SafeAnimal = {
  isMeowing: true,
  isBarking: true,
}; // error: Type is not assignable to type 'SafeAnimal'.
```

### Unsafe Array Indices

TypeScript always assumes all array indices are valid and defined. However, we can't always assume this is the case.

```ts
type Person = { name: string };
const people: Person[] = [{ name: "John" }, { name: "Justin" }];
const invalidName = people[5].name; // runtime error: Cannot read properties of undefined (reading 'name')
```

To avoid this, we can either always assume indices can be `undefined`:

```ts
type SafePerson = { name: string };
const safePeople: (SafePerson | undefined)[] = [{ name: "John" }, {
  name: "Justin",
}];
export const safeName = safePeople[5].name; // error: Object is possibly 'undefined'.
```

Or in some cases we can declare the array as a constant type:

```ts
const peopleAlt = [{ name: "John" }, { name: "Justin" }] as const;
const safeNameAlt = peopleAlt[5].name; // error: Tuple type of length '2' has no element at index '5'.
```

### Boolean Null Check Narrowing

TypeScript isn't always able to narrow types based on context and sometimes needs a bit of help. For example, the `Boolean()` constructor doesn't narrow a type.

```ts
const potentialNumber = Number("300") || null; // type is 'number | null'
if (potentialNumber) {
  console.log(potentialNumber); // type is 'number'
}
if (Boolean(potentialNumber)) {
  console.log(potentialNumber); // type is 'number | null'
}

const falsyArray = ["hello", undefined, "world", null]; // type is '(string | null | undefined)[]'
const filteredStringArray = falsyArray.filter(Boolean); // type is '(string | null | undefined)[]'
```

```tsx
let name = '' as string | null;

// Renders empty string, usually not a problem but can cause crashes with React Native
// https://github.com/facebook/react-native/issues/20764
{name && <Profile name={name} />}

// error: Type 'string | null' is not assignable to type 'string'.
{Boolean(name) && <Profile name={name} />}
```

The best way to get around this is by modifying conditions with a type predicate or by using two negation operators `!!` to use a variable's boolean value.

```ts
const falsyArray = ["hello", undefined, "world", null];
const properlyFilteredStringArray = falsyArray.filter((i): i is string =>
  Boolean(i)
);
```

```tsx
let name = '' as string | null;

{!!name && <Profile name={name} />}
```

### Type Predicate Assumptions

TypeScript assumes that type predicates are connected to functions which properly assert that the predicates are truthy. However, TS will not complain if the predicate function is not exhaustive in property checks:

```ts
type FormattedError = {
  message: string;
  statusCode: number;
};

function isFormattedError(item: unknown): item is FormattedError {
  return true;
}

const anonymousObject: unknown = null;
if (isFormattedError(anonymousObject)) {
  console.log(anonymousObject.message); // runtime error: Cannot read properties of null (reading 'message')
}
```

The only way to prevent this error from occurring is careful code review.

## Resources

If you're having a hard time trying to remember all this information, TypeScript makes really great resources. For one, their handbook is excellent.

https://www.typescriptlang.org/docs/handbook/intro.html

They also make their own cheatsheets which are really cool to check out.

https://www.typescriptlang.org/cheatsheets

And, of course, I highly recommend the book *Effective TypeScript* by Dan Vanderkam. It's a really great resource (as are his blog posts).

https://effectivetypescript.com/

**That's it for TypeScript foundations!** This wasn't a fully comprehensive overview of every single feature of TypeScript by any means (I didn't cover classes, enums, or conditional types), but I touched on all the concepts I consider to be very important to understanding TypeScript.
