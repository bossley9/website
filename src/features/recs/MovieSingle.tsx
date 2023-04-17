import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/movies.json'
import { movieListSchema, type MovieList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Theater movies, documentaries, and extended videos.'

export function MovieSingle() {
  let movieList: MovieList = []
  try {
    movieList = movieListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const groupedByDate: Record<string, MovieList> = movieList.reduce<
    Record<string, MovieList>
  >((acc, item) => {
    const key = item.date
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key]?.push(item)
    return acc
  }, {})

  return (
    <section className="recs">
      <h1>Movies</h1>
      <p>{description}</p>
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ title, year, rating, note }) => {
                return (
                  <li key={title + year}>
                    <span>
                      {title} ({year})
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
