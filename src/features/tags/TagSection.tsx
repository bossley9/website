import { slugify } from "@/_utils/urls";

export type PageProps = { tags: string[] };

export function TagSection({ tags }: PageProps) {
  return (
    <section className="tag-index">
      <h1>Tag Index</h1>
      <ol>
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ol>
    </section>
  );
}
