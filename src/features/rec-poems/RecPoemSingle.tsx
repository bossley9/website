import type { CollectionEntry } from 'astro:content'

export type PageProps = {
  poem: CollectionEntry<'rec-poems'>
}

export function RecPoemSingle({ poem }: PageProps) {
  const { title, author, note, year } = poem.data
  return (
    <article>
      <h1>
        <cite>{title}</cite> by {author}
      </h1>
      {note && <p>{note}</p>}
      {year && <p>Written in {year}.</p>}
      <pre className="poem">{poem.body.trimStart()}</pre>
      <br />
      <p className="footer">
        I do not claim ownership for any of this writing. I only host it here
        because the sources for these works are often inaccessible or go missing
        and I want to preserve the beautiful works of these authors for others
        to enjoy.
      </p>
      <p className="footer">
        If you are an author of this work and would like to have it removed,
        please contact me.
      </p>
    </article>
  )
}
