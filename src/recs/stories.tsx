import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/stories.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass } from "@/_utils/data.ts";
import { assertStoryList } from "@/_utils/assertions.ts";
import type { Story } from "@/_types/data.ts";

export const title = "Stories";
export const description = "Short stories and poems.";

export default function () {
  assertStoryList(data);
  const storyList: Story[] = data;

  const groupedByYear = groupEntriesByYear(storyList);
  return (
    <section class="recsingle">
      <h1>Stories</h1>
      <p>{description}</p>
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map(({ url, title, author, rating, note }) => {
              return (
                <li class={getRatingClass(rating)}>
                  <span>
                    <a href={url}>
                      <cite>{title}</cite> by {author}
                    </a>
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
