import { RatingNote } from "@/_components/RatingNote.tsx";
import { groupEntriesByYear } from "@/_utils/object.ts";
import data from "@/_data/recs/manga.json" with { type: "json" };
import { getRatingClass, getReadingItemURL } from "@/_utils/data.ts";
import { assertMangaList } from "@/_utils/assertions.ts";
import type { Manga } from "@/_types/data.ts";

export const title = "Manga";
export const description = "Japanese manga and comic books.";

export default function () {
  assertMangaList(data);
  const mangaList: Manga[] = data;
  const current = mangaList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    mangaList.filter((item) => !item.current),
  );
  return (
    <section class="recsingle">
      <h1>Manga</h1>
      <p>{description}</p>
      {current && (
        <p>
          I&#39;m currently reading{" "}
          <a href={getReadingItemURL(current)}>
            <i>{current.title}</i>
          </a>{" "}
          by {current.author}.
        </p>
      )}
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map((manga) => {
              const { title, author, rating, note } = manga;

              const startYear = "run_start" in manga
                ? new Date(manga.run_start)
                : new Date(manga.year);

              return (
                <li class={getRatingClass(rating)}>
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
