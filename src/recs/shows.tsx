import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/shows.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass } from "@/_utils/data.ts";
import { assertShowList } from "@/_utils/assertions.ts";
import type { Show } from "@/_types/data.ts";

export const title = "Shows";
export const description = "Cartoons, TV shows, podcasts, and episodic films.";

export default function () {
  assertShowList(data);
  const showList: Show[] = data;
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
          {new Date(current.run_start).getUTCFullYear()}).
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
                        {title}{" "}
                        ({new Date(run_start).getUTCFullYear()}) (podcast)
                      </a>
                    )
                    : (
                      <span>
                        {title} ({new Date(run_start).getUTCFullYear()})
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
