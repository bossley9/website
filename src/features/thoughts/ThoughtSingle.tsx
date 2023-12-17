import { slugify } from "@/_utils/urls";
import type { CollectionEntry } from "astro:content";
import type { ReactNode } from "react";

export type PageProps = {
  thought: CollectionEntry<"thoughts">;
  children?: ReactNode;
};

export function ThoughtSingle({ thought, children }: PageProps) {
  const { title, date, tags } = thought.data;

  return (
    <article className="thought-single">
      <h1>{title}</h1>
      <p>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </p>
      <ul className="dnp taglist">
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}
