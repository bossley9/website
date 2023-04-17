import { Fragment } from 'react'
import { RatingNote } from '@/components/RatingNote'
import data from '@/data/recs/stories.json'
import { storyListSchema, type StoryList } from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const description = 'Short stories and poems.'

export function StorySingle() {
  let storyList: StoryList = []
  try {
    storyList = storyListSchema.parse(data)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }

  const groupedByDate: Record<string, StoryList> = storyList.reduce<
    Record<string, StoryList>
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
      <h1>Stories</h1>
      <p>{description}</p>
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ url, title, author, rating, note }) => {
                return (
                  <li key={url}>
                    <span>
                      <a href={url}>
                        <cite>{title}</cite> by {author}
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
