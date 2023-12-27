import type { RawData } from "lume/core/file.ts";

// "no-operation", an impossible or unimplemented case where no further action should be taken
const NOOP = "NOOP";

// See original JSX plugin implementation:
// https://github.com/lumeland/lume/blob/e63f0ff32153a2216e2ff59385c264c8d2388e7c/plugins/jsx.ts
export function lumeReactPlugin() {
  return (site: Lume.Site) => {
    site.loadPages([".tsx"], {
      loader,
      engine: new ReactEngine(site.options.includes),
    });
  };
}

async function loader(path: string): Promise<RawData> {
  // Add hash to prevent caching. See original implementation:
  // https://github.com/lumeland/lume/blob/e63f0ff32153a2216e2ff59385c264c8d2388e7c/core/loaders/module.ts#L6-L15
  const module = await import(`${path}#${Date.now()}`);
  const { default: content, ...data } = module;
  return {
    ...data,
    content,
  };
}

class ReactEngine implements Lume.Engine {
  includes: string;

  constructor(includes: string) {
    this.includes = includes;
  }

  render(
    content: unknown,
    data?: Record<string, unknown>,
  ) {
    if (typeof content === "string") return content;
    if (typeof content === "undefined") return ""; // no component export
    if (typeof content !== "function") return NOOP;

    const result = content(data);
    if (Array.isArray(result)) {
      return result.join("");
    } else {
      return result;
    }
  }

  renderComponent(
    _content: unknown,
    _data?: Record<string, unknown>,
    _filename?: string,
  ) {
    return NOOP;
  }

  addHelper() {}

  deleteCache() {}
}

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

type JSXProps = {
  children: unknown | unknown[];
  [k: string]: unknown;
};

export function jsxs(
  tag: unknown,
  props: JSXProps,
  _key?: unknown,
): string {
  if (tag === undefined || tag === null) { // fragment
    return appendChild(props.children);
  } else if (typeof tag === "function") { // custom tag
    return tag(props);
  } else if (typeof tag === "string") { // builtin tag
    const attrs = Object.entries(props).reduce<string[]>(
      (acc, [key, value]) => {
        if (key === "children") {
          // ignore children until later
        } else if (typeof value === "boolean" && value) {
          // keep true attrs unchanged and remove false attrs
          acc.push(`${key}`);
        } else {
          acc.push(`${key}="${value}"`);
        }
        return acc;
      },
      [""],
    ).join(" ");

    return VOID_TAGS.includes(tag)
      ? `<${tag}${attrs}>`
      : `<${tag}${attrs}>${appendChild(props.children)}</${tag}>`;
  } else {
    return NOOP;
  }
}

export const jsx = jsxs;

export function Fragment(props: JSXProps) {
  return appendChild(props.children);
}

function appendChild(child: unknown): string {
  if (child === false || child === null || child === undefined) {
    return "";
  }

  if (Array.isArray(child)) {
    return child.map(appendChild).join("");
  }
  return String(child);
}
