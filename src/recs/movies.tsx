import React from "react";
import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/movies.json" with { type: "json" };
import { type Movie, movieListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Movies";
export const description =
  "Theater movies, documentaries, and extended videos.";

export default function () {
  let movieList: Movie[] = [];
  try {
    movieList = movieListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const groupedByDate: Record<string, Movie[]> = movieList.reduce<
    Record<string, Movie[]>
  >((acc, item) => {
    const key = item.date;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key]?.push(item);
    return acc;
  }, {});

  return (
    <section class="rec-single">
      <h1>Movies</h1>
      <p>{description}</p>
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
