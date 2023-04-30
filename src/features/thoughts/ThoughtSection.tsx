import { Fragment } from 'react'
import { ArticleListItem } from '@/components/ArticleListItem'
import { PaginationNav } from '@/components/PaginationNav'
import { getThoughtSlug } from '@/utils/content'
import type { CustomPage } from '@/utils/pagination'
import type { CollectionEntry } from 'astro:content'

export type PageProps = { page: CustomPage<CollectionEntry<'thoughts'>> }

export function ThoughtSection({ page }: PageProps) {
  const groupedEntries = page.data.reduce<
    Record<number, CollectionEntry<'thoughts'>[]>
  >((dict, entry) => {
    const year = entry.data.date.getFullYear()
    if (!dict[year]) {
      dict[year] = []
    }
    dict[year]?.push(entry)
    return dict
  }, {})

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
            <ol className="thoughtlist">
              {entries.map(({ data: { date, title, video } }) => {
                const { url } = getThoughtSlug({ title, date })
                return (
                  <ArticleListItem
                    key={url}
                    title={title}
                    date={date}
                    url={url}
                    isVideo={Boolean(video)}
                  />
                )
              })}
            </ol>
          </Fragment>
        ))}
      <PaginationNav
        index={page.currentPage}
        total={page.lastPage}
        baseUrl="/thoughts"
      />
    </section>
  )
}
