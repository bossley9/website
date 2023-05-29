import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/anime.json'
import { animeListSchema, type AnimeList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Japanese animated shows and movies.'

export function AnimeSingle() {
  let animeList: AnimeList = []
  try {
    animeList = animeListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const current = animeList.find((item) => item.current)

  const groupedByDate: Record<string, AnimeList> = animeList
    .filter((item) => !item.current)
    .reduce<Record<string, AnimeList>>((acc, item) => {
      const key = item.date
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
      <h1>Anime</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently watching {current.title_translated ?? current.title}
          .
        </p>
      )}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map((item) => {
                const title = item.title_translated ?? item.title
                const year =
                  item.type === 'anime'
                    ? item.run_start.getUTCFullYear()
                    : item.year
                return (
                  <li key={title}>
                    <span>
                      {title} ({year})
                    </span>
                    <RatingNote rating={item.rating} note={item.note} />
                  </li>
                )
              })}
            </ol>
          </Fragment>
        ))}
    </section>
  )
}
