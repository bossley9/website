import { getObjectKeys } from "@/_utils/object.ts";
import type { Playlist } from "@/_types/posts.ts";

export const title = "Memes";

type Props = {
  memesByYear: Record<number, Playlist>;
};

export default function ({ memesByYear }: Props) {
  const years = getObjectKeys(memesByYear);
  return (
    <section>
      <h1>Memes</h1>
      <p>
        This is a collection of all my meme playlists. I could save all of these
        videos in various Youtube playlists but I prefer to keep them in the
        {" "}
        <code>.m3u</code> file format if videos are deleted or made private.
      </p>
      <ol class="articlelist">
        {years
          .sort((a, b) => b - a)
          .map((year) => {
            return (
              <li>
                <a href={"/memes/" + year}>
                  <span>
                    <strong>{year}</strong>
                  </span>
                </a>
              </li>
            );
          })}
      </ol>
    </section>
  );
}
