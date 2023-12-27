import { RatingNote } from "@/_components/RatingNote.tsx";
import { groupEntriesByYear } from "@/_utils/object.ts";
import data from "@/_data/recs/games.json" with { type: "json" };
import { type Game, gameListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Games";
export const description = "Video games played on any platform.";

export default function () {
  let gameList: Game[] = [];
  try {
    gameList = gameListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const current = gameList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(gameList);
  return (
    <section class="rec-single">
      <h1>Games</h1>
      <p>{description}</p>
      {current && <p>I&#39;m currently playing {current.title}.</p>}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map(({ title, year, rating, note }) => {
              return (
                <li>
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
