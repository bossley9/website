import React from "react";
import { RatingNote } from "@/_components/RatingNote.tsx";
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
    <section class="rec-single">
      <h1>Games</h1>
      <p>{description}</p>
      {current && <p>I&#39;m currently playing {current.title}.</p>}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
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
