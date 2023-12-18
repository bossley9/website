import React from "react";
import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { PaginationNav } from "@/_components/PaginationNav.tsx";
import { customPagination, groupEntriesByYear } from "@/_utils/pagination.ts";
import { assertTabPost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Tabs";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const pages = customPagination(search.pages("tabs", "date=desc"), "/tabs");
  for (const page of pages) {
    const { url, data, currentPage, lastPage } = page;
    const groupedEntries = groupEntriesByYear(data);
    yield {
      layout: Layouts.BaseLayout,
      url,
      content: (
        <section>
          <h1>Tabs</h1>
          <p>
            In my spare time I play a lot of guitar. I try to document guitar
            tabs for songs I&#39;ve learned or created myself.
          </p>
          {groupedEntries.map(([year, entries]) => (
            <>
              <h2>{year}</h2>
              <ol class="articlelist">
                {entries.map((entry) => {
                  assertTabPost(entry);
                  const { date, title, url } = entry;
                  return (
                    <ArticleListItem
                      title={title}
                      date={date}
                      url={url}
                    />
                  );
                })}
              </ol>
            </>
          ))}
          <PaginationNav
            index={currentPage}
            total={lastPage}
            baseUrl="/tabs"
          />
        </section>
      ),
    };
  }
}
