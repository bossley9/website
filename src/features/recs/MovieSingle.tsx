import { Fragment } from "react";
import { RatingNote } from "@/components/RatingNote";
import data from "@/data/recs/movies.json";
import { type Movie, movieListSchema } from "@/_utils/schemas";
import { ZodError, fromZodError } from "@deps";

export const description =
  "Theater movies, documentaries, and extended videos.";

export function MovieSingle() {
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
    <section className="rec-single">
      <h1>Movies</h1>
      <p>{description}</p>
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ title, year, rating, note }) => {
                return (
                  <li key={title + year}>
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
