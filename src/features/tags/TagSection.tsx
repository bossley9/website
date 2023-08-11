import { slugify } from "@/utils/urls";

export type PageProps = { tags: string[] };

export function TagSection({ tags }: PageProps) {
  return (
    <section>
      <h1>Tag Index</h1>
      <ol className="tagindex">
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ol>
    </section>
  );
}
