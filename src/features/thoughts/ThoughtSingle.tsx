import { slugify } from '@/utils/urls'
import type { CollectionEntry } from 'astro:content'
import type { ReactNode } from 'react'

export type PageProps = {
  thought: CollectionEntry<'thoughts'>
}

export function ThoughtSingle({
  thought,
  children,
}: PageProps & { children?: ReactNode }) {
  const { title, date, tags } = thought.data

  return (
    <article>
      <h1>{title}</h1>
      <p>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </p>
      <ul className="taglist donotprint">
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ul>
      {children}
    </article>
  )
}
