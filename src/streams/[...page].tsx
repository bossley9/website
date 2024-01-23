import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { YearPaginationNav } from "@/_components/YearPaginationNav.tsx";
import { yearPagination } from "@/_utils/pagination.ts";
import { assertStreamPost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Thoughts";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const pages = yearPagination(search.pages("stream", "date=desc"), "/streams");

  if (pages.length === 0) {
    yield {
      layout: Layouts.BaseLayout,
      url: "/streams/",
      content: (
        <section>
          <h1>Streams</h1>
          <p>
            Sorry, right now I don't have any streams recorded and uploaded yet.
            Stay tuned!
          </p>
        </section>
      ),
    };
  }

  for (const page of pages) {
    const { url, year, years, entries } = page;
    yield {
      layout: Layouts.BaseLayout,
      url,
      content: (
        <section>
          <h1>Streams</h1>
          <p>
            I like playing video games with other people and I want to record
            some of my first experiences here.
          </p>
          <h2>{year}</h2>
          <ol class="articlelist">
            {entries.map((entry) => {
              assertStreamPost(entry);
              const { date, title, url } = entry;
              return (
                <ArticleListItem
                  title={title}
                  date={date}
                  url={url}
                  isVideo={false}
                />
              );
            })}
          </ol>
          <YearPaginationNav
            current={year}
            years={years}
            baseUrl="/streams"
          />
        </section>
      ),
    };
  }
}
