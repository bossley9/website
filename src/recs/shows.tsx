import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/shows.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass } from "@/_utils/data.ts";
import { type Show, showListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Shows";
export const description = "Cartoons, TV shows, podcasts, and episodic films.";

export default function () {
  let showList: Show[] = [];
  try {
    showList = showListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const current = showList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    showList.filter((item) => !item.current),
  );
  return (
    <section class="recsingle">
      <h1>Shows</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently watching {current.title} (
          {current.run_start.getUTCFullYear()}).
        </p>
      )}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map((item) => {
              const { title, run_start, rating, note } = item;
              return (
                <li class={getRatingClass(rating)}>
                  {item.type === "podcast"
                    ? (
                      <a href={item.url}>
                        {title} ({run_start.getUTCFullYear()}) (podcast)
                      </a>
                    )
                    : (
                      <span>
                        {title} ({run_start.getUTCFullYear()})
                      </span>
                    )}
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
