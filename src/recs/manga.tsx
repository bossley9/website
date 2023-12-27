import { RatingNote } from "@/_components/RatingNote.tsx";
import { groupEntriesByYear } from "@/_utils/object.ts";
import data from "@/_data/recs/manga.json" with { type: "json" };
import { type Manga, mangaListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Manga";
export const description = "Japanese manga and comic books.";

export default function () {
  let mangaList: Manga[] = [];
  try {
    mangaList = mangaListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const current = mangaList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    mangaList.filter((item) => !item.current),
  );
  return (
    <section class="rec-single">
      <h1>Manga</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently reading <i>{current.title}</i> by {current.author}.
        </p>
      )}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map((manga) => {
              const { url, title, author, rating, note } = manga;

              const startYear = "run_start" in manga
                ? manga.run_start
                : new Date(manga.year);

              return (
                <li>
                  <span>
                    {title} by {author} ({startYear.getUTCFullYear()})
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
