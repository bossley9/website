import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/books.json'
import { bookListSchema, type BookList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Print books and audiobooks.'

export function BookSingle() {
  let bookList: BookList = []
  try {
    bookList = bookListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const current = bookList.find((item) => item.current)

  const groupedByDate: Record<string, BookList> = bookList
    .filter((item) => !item.current)
    .reduce<Record<string, BookList>>((acc, item) => {
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
      <h1>Books</h1>
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
              {items.map(({ isbn, title, author, year, rating, note }) => {
                return (
                  <li key={isbn}>
                    <span>
                      <a href={`https://isbnsearch.org/isbn/${isbn}`}>
                        {title} by {author} ({year})
                      </a>
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
