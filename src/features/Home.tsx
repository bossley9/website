import { About } from "@/components/About";
import { ArticleListItem } from "@/components/ArticleListItem";
import { getThoughtSlug } from "@/utils/content";
import type { CollectionEntry } from "astro:content";

type PageProps = {
  recentThoughts: CollectionEntry<"thoughts">[];
};

export function Home({ recentThoughts }: PageProps) {
  return (
    <>
      <About />
      <section>
        <h1>Recent Thoughts</h1>
        <ol className="thoughtlist">
          {recentThoughts.map(({ data: { date, title, video } }) => {
            const { url } = getThoughtSlug({ date, title });
            return (
              <ArticleListItem
                key={url}
                title={title}
                date={date}
                url={url}
                isVideo={Boolean(video)}
              />
            );
          })}
        </ol>
        <p>
          <a href="/thoughts">more...</a>
        </p>
      </section>
    </>
  );
}
