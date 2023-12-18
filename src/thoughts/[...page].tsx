import React from "react";
import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { YearPaginationNav } from "@/_components/YearPaginationNav.tsx";
import { thoughtPagination } from "@/_utils/pagination.ts";
import { assertThoughtPost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Thoughts";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const pages = thoughtPagination(search.pages("thought", "date=desc"));

  for (const page of pages) {
    const { url, year, years, data: entries } = page;
    yield {
      layout: Layouts.BaseLayout,
      url,
      content: (
        <section>
          <h1>Thoughts</h1>
          <p>
            Writing is one of my favorite pastimes. I mostly write about
            technical programs or software that interests me but I also write
            reviews and life reflections.
          </p>
          <h2>{year}</h2>
          <ol class="articlelist">
            {entries.map((entry) => {
              assertThoughtPost(entry);
              const { date, title, url, video } = entry;
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
          <YearPaginationNav
            current={year}
            years={years}
            baseUrl="/thoughts"
          />
        </section>
      ),
    };
  }
}
