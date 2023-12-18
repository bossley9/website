import { Fragment } from "react";
import { RatingNote } from "@/_components/RatingNote";
import data from "@/data/recs/books.json";
import { type Book, bookListSchema } from "@/_utils/schemas";
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

  const groupedByDate: Record<string, Book[]> = bookList
    .filter((item) => !item.current)
    .reduce<Record<string, Book[]>>((acc, item) => {
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
      <h1>Books</h1>
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
              {items.map(({ isbn, title, author, year, rating, note }) => {
                return (
                  <li key={isbn}>
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
          </Fragment>
        ))}
    </section>
  );
}