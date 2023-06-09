import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/shows.json'
import { showListSchema, type ShowList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Cartoons, TV shows, podcasts, and episodic films.'

export function ShowSingle() {
  let showList: ShowList = []
  try {
    showList = showListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const current = showList.find((item) => item.current)

  const groupedByDate: Record<string, ShowList> = showList
    .filter((item) => !item.current)
    .reduce<Record<string, ShowList>>((acc, item) => {
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
      <h1>Shows</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently watching {current.title} (
          {current.run_start.getUTCFullYear()}).
        </p>
      )}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map((item) => {
                const { title, run_start, run_end, rating, note } = item
                return (
                  <li key={title + run_start + run_end}>
                    {item.type === 'podcast' ? (
                      <a href={item.url}>
                        {title} ({run_start.getUTCFullYear()}) (podcast)
                      </a>
                    ) : (
                      <span>
                        {title} ({run_start.getUTCFullYear()})
                      </span>
                    )}
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
