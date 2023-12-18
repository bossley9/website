import React from "react";
import data from "@/_data/recs/articles.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { type Article, articleListSchema } from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export const title = "Articles";
export const description = "Blog posts, journal articles, and white papers.";

export default function () {
  let articleList: Article[] = [];
  try {
    articleList = articleListSchema.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }

  const groupedByYear = groupEntriesByYear(articleList);
  return (
    <section class="rec-single">
      <h1>Articles</h1>
      <p>{description}</p>
      {groupedByYear.map(([year, items]) => (
        <>
          <h2>{year}</h2>
          <ol>
            {items.map(({ url, type, author, published, title, note }) => {
              return (
                <li>
                  <span>
                    <a href={url}>
                      {type === "paper"
                        ? (
                          <>
                            {author}, {published.getUTCFullYear()}.{" "}
                            <cite>{title}</cite>.
                          </>
                        )
                        : (
                          <>
                            {title} by {author} ({published.getUTCFullYear()})
                          </>
                        )}
                    </a>
                  </span>
                  {note && (
                    <span>
                      <i>{note}</i>
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </>
      ))}
    </section>
  );
}
