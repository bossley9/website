import { RatingNote } from "@/_components/RatingNote.tsx";
import { groupEntriesByYear } from "@/_utils/object.ts";
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

  const groupedByYear = groupEntriesByYear(movieList);
  return (
    <section class="recsingle">
      <h1>Movies</h1>
      <p>{description}</p>
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
