import { ArticleListItem } from "@/_components/ArticleListItem";
import { PaginationNav } from "@/_components/PaginationNav";
import { getRecipeSlug } from "@/_utils/content";
import type { CustomPage } from "@/_utils/pagination";
import type { CollectionEntry } from "@deps";

export type PageProps = { page: CustomPage<CollectionEntry<"recipes">> };

export function RecipeSection({ page }: PageProps) {
  return (
    <section>
      <h1>Recipes</h1>
      <p>
        Cooking is an art. I enjoy creating and trying new food and I want to
        share more of my recipes.
      </p>
      <ol className="articlelist">
        {page.data.map(({ data: { date, title } }) => {
          const { url } = getRecipeSlug({ title, date });
          return (
            <ArticleListItem key={url} title={title} date={date} url={url} />
          );
        })}
      </ol>
      <PaginationNav
        index={page.currentPage}
        total={page.lastPage}
        baseUrl="/recipes"
      />
    </section>
  );
}
