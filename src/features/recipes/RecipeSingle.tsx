import { slugify } from '@/utils/urls'
import type { CollectionEntry } from 'astro:content'
import type { ReactNode } from 'react'

export type PageProps = {
  recipe: CollectionEntry<'recipes'>
  children?: ReactNode
}

export function RecipeSingle({ recipe, children }: PageProps) {
  const { title, date, tags, prep, cook, wait, servings } = recipe.data

  return (
    <article>
      <h1>{title}</h1>
      <p>
        Last updated{' '}
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </p>
      <ul className="taglist">
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ul>

      {prep && <p>Prep time: {prep}</p>}
      {cook && <p>Cook time: {cook}</p>}
      {wait && <p>Wait time: {wait}</p>}

      <p>Serves: {servings}</p>

      {children}
    </article>
  )
}
