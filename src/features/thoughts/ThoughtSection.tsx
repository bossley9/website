import { Fragment } from "react";
import { ArticleListItem } from "@/components/ArticleListItem";
import { YearPaginationNav } from "@/components/YearPaginationNav";
import { getThoughtSlug } from "@/utils/content";
import type { YearPage } from "@/utils/pagination";
import type { CollectionEntry } from "astro:content";

export type PageProps = { page: YearPage<CollectionEntry<"thoughts">> };

export function ThoughtSection({ page }: PageProps) {
  const groupedEntries = page.data.reduce<
    Record<number, CollectionEntry<"thoughts">[]>
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
      <h1>Thoughts</h1>
      <p>
        Writing is one of my favorite pastimes. I mostly write about technical
        programs or software that interests me but I also write reviews and life
        reflections.
      </p>
      {Object.entries(groupedEntries)
        .sort(([year1], [year2]) => Number(year2) - Number(year1))
        .map(([year, entries]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol className="articlelist">
              {entries.map(({ data: { date, title, video } }) => {
                const { url } = getThoughtSlug({ title, date });
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
          </Fragment>
        ))}
      <YearPaginationNav
        current={page.currentYear}
        years={page.years}
        baseUrl="/thoughts"
      />
    </section>
  );
}
