import { ArticleListItem } from "@/_components/ArticleListItem";
import type { TagMeta } from "@/_utils/tags";

export type PageProps = {
  tag: string;
  pages: TagMeta[];
};

export function TagSingle({ tag, pages }: PageProps) {
  return (
    <section className="tag-single">
      <h1>
        Tagged &#34;<span className="tag-name">{tag}</span>&#34;
      </h1>
      <ol className="articlelist">
        {pages
          .filter(({ url }) => url.length > 0) // sanity check: do not display invalid entries
          .map(({ date, title, url }) => (
            <ArticleListItem key={url} date={date} title={title} url={url} />
          ))}
      </ol>
    </section>
  );
}
