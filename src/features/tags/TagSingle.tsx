import { ArticleListItem } from "@/components/ArticleListItem";
import type { TagMeta } from "@/utils/tags";

export type PageProps = {
  tag: string;
  pages: TagMeta[];
};

export function TagSingle({ tag, pages }: PageProps) {
  return (
    <section>
      <h1>Tagged &#34;{tag}&#34;</h1>
      <ol className="thoughtlist">
        {pages
          .filter(({ url }) => url.length > 0) // sanity check: do not display invalid entries
          .map(({ date, title, url }) => (
            <ArticleListItem key={url} date={date} title={title} url={url} />
          ))}
      </ol>
    </section>
  );
}
