import data from "@/_data/recs/articles.json" with { type: "json" };
import { groupEntriesByYear } from "@/_utils/object.ts";
import { assertArticleList } from "@/_utils/assertions.ts";
import type { Article } from "@/_types/data.ts";

export const title = "Articles";
export const description = "Blog posts, journal articles, and white papers.";

export default function () {
  assertArticleList(data);
  const articleList: Article[] = data;

  const groupedByYear = groupEntriesByYear(articleList);
  return (
    <section class="recsingle">
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
                            {author}, {new Date(published).getUTCFullYear()}.
                            {" "}
                            <cite>{title}</cite>.
                          </>
                        )
                        : (
                          <>
                            {title} by {author}{" "}
                            ({new Date(published).getUTCFullYear()})
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
