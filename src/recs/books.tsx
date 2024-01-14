import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/books.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { getRatingClass, getReadingItemURL } from "@/_utils/data.ts";
import { assertBookList } from "@/_utils/assertions.ts";
import type { Book } from "@/_types/data.ts";

export const title = "Books";
export const description = "Print books and audiobooks.";

export default function () {
  assertBookList(data);
  const bookList: Book[] = data;

  const current = bookList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    bookList.filter((item) => !item.current),
  );
  return (
    <section class="recsingle">
      <h1>Books</h1>
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
            {items.map((item) => {
              const { title, author, year, rating, note } = item;
              return (
                <li class={getRatingClass(rating)}>
                  <span>
                    <a href={getReadingItemURL(item)}>
                      {title} by {author} ({year})
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
