import React from "react";
import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/anime.json" with { type: "json" };
import { type Anime, animeListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Anime";
export const description = "Japanese animated shows and movies.";

export default function () {
  let animeList: Anime[] = [];
  try {
    animeList = animeListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const current = animeList.find((item) => item.current);

  const groupedByDate: Record<string, Anime[]> = animeList
    .filter((item) => !item.current)
    .reduce<Record<string, Anime[]>>((acc, item) => {
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
      <h1>Anime</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently watching {current.title_translated ?? current.title}
          .
        </p>
      )}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <>
            <h2>{year}</h2>
            <ol>
              {items.map((item) => {
                const title = item.title_translated ?? item.title;
                const year = item.type === "anime"
                  ? item.run_start.getUTCFullYear()
                  : item.year;
                return (
                  <li>
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
