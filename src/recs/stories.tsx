import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/stories.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { type Story, storyListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Stories";
export const description = "Short stories and poems.";

export default function () {
  let storyList: Story[] = [];
  try {
    storyList = storyListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

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
                <li>
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
