import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/manga.json'
import { mangaListSchema, type MangaList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Japanese manga and comic books.'

export function MangaSingle() {
  let mangaList: MangaList = []
  try {
    mangaList = mangaListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const current = mangaList.find((item) => item.current)

  const groupedByDate: Record<string, MangaList> = mangaList
    .filter((item) => !item.current)
    .reduce<Record<string, MangaList>>((acc, item) => {
      const key = item.date || 'No Date'
      if (!acc[key]) {
        acc[key] = []
      }
      if (!item.current) {
        acc[key]?.push(item)
      }
      return acc
    }, {})

  return (
    <section className="recs">
      <h1>Manga</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently reading <i>{current.title}</i> by {current.author}.
        </p>
      )}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ url, title, author, run_start, rating, note }) => {
                return (
                  <li key={url}>
                    <span>
                      {title} by {author} ({run_start.getFullYear()})
                    </span>
                    <RatingNote rating={rating} note={note} />
                  </li>
                )
              })}
            </ol>
          </Fragment>
        ))}
    </section>
  )
}
