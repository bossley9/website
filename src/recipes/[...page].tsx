import React from "react";
import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { PaginationNav } from "@/_components/PaginationNav.tsx";
import { customPagination } from "@/_utils/pagination.ts";
import { assertRecipePost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const title = "Recipes";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const pages = customPagination(
    search.pages("recipe", "title=asc"),
    "/recipes",
  );
  for (const page of pages) {
    const { url, data, currentPage, lastPage } = page;
    yield {
      layout: Layouts.BaseLayout,
      url,
      content: (
        <section>
          <h1>Recipes</h1>
          <p>
            Cooking is an art. I enjoy creating and trying new food and I want
            to share more of my recipes.
          </p>
          <ol class="articlelist">
            {data.map((entry) => {
              assertRecipePost(entry);
              const { date, title, url } = entry;
              return <ArticleListItem title={title} date={date} url={url} />;
            })}
          </ol>
          <PaginationNav
            index={currentPage}
            total={lastPage}
            baseUrl="/recipes"
          />
        </section>
      ),
    };
  }
}
