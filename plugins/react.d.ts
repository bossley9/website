// See React TS types:
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react
declare namespace JSX {
  interface Element {
    [attribute: string]: string | number | boolean;
  }
  interface IntrinsicElements {
    [elemName: string]: Element;
  }
}
