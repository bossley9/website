import type { CollectionEntry } from "astro:content";

export type PageProps = {
  poem: CollectionEntry<"poems">;
};

export function PoemSingle({ poem }: PageProps) {
  const { title, date, description } = poem.data;

  return (
    <article className="poem-single">
      <h1>{title}</h1>
      <p>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </p>
      {description && (
        <p>
          <i>{description}</i>
        </p>
      )}
      <pre>{poem.body.trimStart()}</pre>
    </article>
  );
}
