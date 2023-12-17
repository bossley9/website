import { Fragment } from "react";
import { ArticleListItem } from "@/components/ArticleListItem";
import { PaginationNav } from "@/components/PaginationNav";
import { getTabSlug } from "@/_utils/content";
import type { CustomPage } from "@/_utils/pagination";
import type { CollectionEntry } from "@deps";

export type PageProps = { page: CustomPage<CollectionEntry<"tabs">> };

export function TabSection({ page }: PageProps) {
  const groupedEntries = page.data.reduce<
    Record<number, CollectionEntry<"tabs">[]>
  >((dict, entry) => {
    const year = entry.data.date.getUTCFullYear();
    if (!dict[year]) {
      dict[year] = [];
    }
    dict[year]?.push(entry);
    return dict;
  }, {});

  return (
    <section>
      <h1>Tabs</h1>
      <p>
        In my spare time I play a lot of guitar. I try to document guitar tabs
        for songs I&#39;ve learned or created myself.
      </p>
      {Object.entries(groupedEntries)
        .sort(([year1], [year2]) => Number(year2) - Number(year1))
        .map(([year, entries]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol className="articlelist">
              {entries.map(({ data: { date, title } }) => {
                const { url } = getTabSlug({ title, date });
                return (
                  <ArticleListItem
                    key={url}
                    title={title}
                    date={date}
                    url={url}
                  />
                );
              })}
            </ol>
          </Fragment>
        ))}
      <PaginationNav
        index={page.currentPage}
        total={page.lastPage}
        baseUrl="/tabs"
      />
    </section>
  );
}
