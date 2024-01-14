import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/anime.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass } from "@/_utils/data.ts";
import { assertAnimeList } from "@/_utils/assertions.ts";
import type { Anime } from "@/_types/data.ts";

export const title = "Anime";
export const description = "Japanese animated shows and movies.";

export default function () {
  assertAnimeList(data);
  const animeList: Anime[] = data;

  const current = animeList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    animeList.filter((item) => !item.current),
  );
  return (
    <section class="recsingle">
      <h1>Anime</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently watching {current.title_translated ?? current.title}
          .
        </p>
      )}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map((item) => {
              const title = item.title_translated ?? item.title;
              const year = item.type === "anime"
                ? new Date(item.run_start).getUTCFullYear()
                : item.year;
              return (
                <li class={getRatingClass(item.rating)}>
                  <span>
                    {title} ({year})
                  </span>
                  <RatingNote rating={item.rating} note={item.note} />
                </li>
              );
            })}
          </ol>
        </>
      ))}
    </section>
  );
}
