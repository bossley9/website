import { getObjectEntries } from "@/_utils/object.ts";
import { Layouts } from "@/_utils/constants.ts";
import type { Playlist } from "@/_types/posts.ts";

type Props = {
  memesByYear: Record<number, Playlist>;
};

export default function* ({ memesByYear }: Props) {
  const pages = getObjectEntries(memesByYear);
  for (const page of pages) {
    const [year, playlist] = page;
    yield {
      layout: Layouts.BaseLayout,
      url: `/memes/${year}/`,
      title: `Memes (${year})`,
      content: (
        <article class="memesingle">
          <h1>Memes ({year})</h1>
          <ol>
            {playlist.map(({ file, comment }) => (
              <li>
                <a href={file}>{comment || file}</a>
              </li>
            ))}
          </ol>
        </article>
      ),
    };
  }
}
