import { RatingNote } from "@/_components/RatingNote.tsx";
import { YearPaginationNav } from "@/_components/YearPaginationNav.tsx";
import data from "@/_data/recs/movies.json" with { type: "json" };
import { assertMovieList } from "@/_utils/assertions.ts";
import type { Movie } from "@/_types/data.ts";
import { yearPagination } from "@/_utils/pagination.ts";
import { getRatingClass } from "@/_utils/data.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Movies";
export const description =
  "Theater movies, documentaries, and extended videos.";

export default function* () {
  assertMovieList(data);
  const movieList: Movie[] = data;
  const pages = yearPagination(
    movieList,
    "/recs/movies",
  );

  for (const page of pages) {
    const { year, years, url, entries } = page;
    yield {
      url,
      layout: Layouts.BaseLayout,
      content: (
        <section class="recsingle">
          <h1>Movies</h1>
          <p>{description}</p>
          <p>
            This is where I record every movie I've ever watched and rating each
            accordingly. If you think I need to post these on Letterboxd... bite
            me :)
          </p>
          <h2>{year}</h2>
          <ol>
            {entries.map(({ title, year, rating, note }) => {
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
          <YearPaginationNav
            current={year}
            years={years}
            baseUrl="/recs/movies"
          />
        </section>
      ),
    };
  }
}
