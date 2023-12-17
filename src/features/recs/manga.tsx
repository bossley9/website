import { Fragment } from "react";
import { RatingNote } from "@/_components/RatingNote";
import data from "@/data/recs/manga.json";
import { type Manga, mangaListSchema } from "@/_utils/schemas";
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

  const groupedByDate: Record<string, Manga[]> = mangaList
    .filter((item) => !item.current)
    .reduce<Record<string, Manga[]>>((acc, item) => {
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
    <section className="rec-single">
      <h1>Manga</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently reading <i>{current.title}</i> by {current.author}.
        </p>
      )}
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map((manga) => {
                const { url, title, author, rating, note } = manga;

                const startYear =
                  "run_start" in manga ? manga.run_start : new Date(manga.year);

                return (
                  <li key={url}>
                    <span>
                      {title} by {author} ({startYear.getUTCFullYear()})
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
