import { Fragment } from "react";
import data from "@/data/recs/articles.json";
import { type Article, articleListSchema } from "@/utils/schemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const description = "Blog posts, journal articles, and white papers.";

export function ArticleSingle() {
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

  const groupedByDate: Record<string, Article[]> = articleList.reduce<
    Record<string, Article[]>
  >((acc, item) => {
    const key = item.date;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key]?.push(item);
    return acc;
  }, {});

  return (
    <section className="rec-single">
      <h1>Articles</h1>
      <p>{description}</p>
      {Object.entries(groupedByDate)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([year, items]) => (
          <Fragment key={year}>
            <h2>{year}</h2>
            <ol>
              {items.map(({ url, type, author, published, title, note }) => {
                return (
                  <li key={url}>
                    <span>
                      <a href={url}>
                        {type === "paper" ? (
                          <>
                            {author}, {published.getUTCFullYear()}.{" "}
                            <cite>{title}</cite>.
                          </>
                        ) : (
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
          </Fragment>
        ))}
    </section>
  );
}
