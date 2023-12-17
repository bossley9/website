import type { Playlist } from "@/_utils/playlists";

export type PageProps = {
  playlist: Playlist;
  year: number;
};

export function MemeSingle({ playlist, year }: PageProps) {
  return (
    <article className="meme-single">
      <h1>Memes ({year})</h1>
      <ol>
        {playlist.map(({ file, comment }) => (
          <li key={file}>
            <a href={file}>{comment ?? file}</a>
          </li>
        ))}
      </ol>
    </article>
  );
}
