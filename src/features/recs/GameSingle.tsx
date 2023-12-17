import { Fragment } from "react";
import { RatingNote } from "@/components/RatingNote";
import data from "@/data/recs/games.json";
import { type Game, gameListSchema } from "@/_utils/schemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const description = "Video games played on any platform.";

export function GameSingle() {
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

  const groupedByDate: Record<string, Game[]> = gameList
    .filter((item) => !item.current)
    .reduce<Record<string, Game[]>>((acc, item) => {
      const key = item.date;
      if (!acc[key]) {
        acc[key] = [];
      }
      if (!item.current) {
        acc[key]?.push(item);
      }
      return acc;
    }, {});

  return (
    <section className="rec-single">
      <h1>Games</h1>
      <p>{description}</p>
      {current && <p>I&#39;m currently playing {current.title}.</p>}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ url, title, year, rating, note }) => {
                return (
                  <li key={url}>
                    <span>
                      {title} ({year})
                    </span>
                    <RatingNote rating={rating} note={note} />
                  </li>
                );
              })}
            </ol>
          </Fragment>
        ))}
    </section>
  );
}
