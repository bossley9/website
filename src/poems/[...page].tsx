import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { PaginationNav } from "@/_components/PaginationNav.tsx";
import { customPagination } from "@/_utils/pagination.ts";
import { groupEntriesByYear } from "@/_utils/object.ts";
import { assertPoemPost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Poems";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const pages = customPagination(search.pages("poem", "date=desc"), "/poems");
  for (const page of pages) {
    const { url, data, currentPage, lastPage } = page;
    const groupedEntries = groupEntriesByYear(data);
    yield {
      layout: Layouts.BaseLayout,
      url,
      content: (
        <section>
          <h1>Poems</h1>
          <p>
            I am by nature a very thoughtful and emotional person. I often
            release my pain and expression in the form of poetry.
          </p>
          {groupedEntries.map(([year, entries]) => (
            <>
              <h2>{year}</h2>
              <ol class="articlelist">
                {entries.map((entry) => {
                  assertPoemPost(entry);
                  const { date, title, url } = entry;
                  return (
                    <ArticleListItem
                      title={title}
                      date={date}
                      url={url}
                    />
                  );
                })}
              </ol>
            </>
          ))}
          <PaginationNav
            index={currentPage}
            total={lastPage}
            baseUrl="/poems"
          />
        </section>
      ),
    };
  }
}
