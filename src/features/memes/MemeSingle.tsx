import type { Playlist } from '@/utils/playlists'

export type PageProps = {
  playlist: Playlist
  year: number
}

export function MemeSingle({ playlist, year }: PageProps) {
  return (
    <article>
      <h1>Memes ({year})</h1>
      <ul className="memelist">
        {playlist.map(({ file, comment }) => (
          <li key={file}>
            <a href={file}>{comment ?? file}</a>
          </li>
        ))}
      </ul>
    </article>
  )
}
