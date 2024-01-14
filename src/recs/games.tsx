import { RatingNote } from "@/_components/RatingNote.tsx";
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass } from "@/_utils/data.ts";
import data from "@/_data/recs/games.json" with { type: "json" };
import { assertGameList } from "@/_utils/assertions.ts";
import type { Game } from "@/_types/data.ts";

export const title = "Games";
export const description = "Video games played on any platform.";

export default function () {
  assertGameList(data);
  const gameList: Game[] = data;

  const current = gameList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(gameList);
  return (
    <section class="recsingle">
      <h1>Games</h1>
      <p>{description}</p>
      {current && <p>I&#39;m currently playing {current.title}.</p>}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map(({ title, year, rating, note }) => {
              return (
                <li class={getRatingClass(rating)}>
                  <span>
                    {title} ({year})
                  </span>
                  <RatingNote rating={rating} note={note} />
                </li>
              );
            })}
          </ol>
        </>
      ))}
    </section>
  );
}
