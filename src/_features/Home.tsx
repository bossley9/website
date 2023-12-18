import React from "react";
import { About } from "@/_components/About.tsx";
import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { assertThoughtPost } from "@/_utils/assertions.ts";
import type { Data } from "lume/core/file.ts";

type PageProps = {
  recentThoughts: Data[];
};

export function Home({ recentThoughts }: PageProps) {
  return (
    <>
      <About />
      <section>
        <h2>Recent Thoughts</h2>
        <ol class="articlelist">
          {recentThoughts.map((thought) => {
            assertThoughtPost(thought);
            const { date, title, url, video } = thought;
            return (
              <ArticleListItem
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
