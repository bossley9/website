import React from "react";
import { RatingNote } from "@/_components/RatingNote.tsx";
import data from "@/_data/recs/books.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { type Book, bookListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Books";
export const description = "Print books and audiobooks.";

export default function () {
  let bookList: Book[] = [];
  try {
    bookList = bookListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const current = bookList.find((item) => item.current);

  const groupedByYear = groupEntriesByYear(
    bookList.filter((item) => !item.current),
  );
  return (
    <section class="rec-single">
      <h1>Books</h1>
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
            {items.map(({ isbn, title, author, year, rating, note }) => {
              return (
                <li>
                  <span>
                    <a href={`https://isbnsearch.org/isbn/${isbn}`}>
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
