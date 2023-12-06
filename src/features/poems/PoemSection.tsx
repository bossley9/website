import { Fragment } from "react";
import { ArticleListItem } from "@/components/ArticleListItem";
import { PaginationNav } from "@/components/PaginationNav";
import { getPoemSlug } from "@/utils/content";
import type { CustomPage } from "@/utils/pagination";
import type { CollectionEntry } from "astro:content";

export type PageProps = { page: CustomPage<CollectionEntry<"poems">> };

export function PoemSection({ page }: PageProps) {
  const groupedEntries = page.data.reduce<
    Record<number, CollectionEntry<"poems">[]>
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
      <h1>Poems</h1>
      <p>
        I am by nature a very thoughtful and emotional person. I often release
        my pain and expression in the form of poetry.
      </p>
      {Object.entries(groupedEntries)
        .sort(([year1], [year2]) => Number(year2) - Number(year1))
        .map(([year, entries]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol className="articlelist">
              {entries.map(({ data: { date, title } }) => {
                const { url } = getPoemSlug({ title, date });
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
        baseUrl="/poems"
      />
    </section>
  );
}
