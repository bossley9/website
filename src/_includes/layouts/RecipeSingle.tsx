import BaseLayout from "@layouts/BaseLayout.tsx";
import { RecipeTime } from "@/_components/RecipeTime.tsx";
import { slugify } from "@/_utils/urls.ts";
import { assertRecipePost } from "@/_utils/assertions.ts";
import type { LayoutProps } from "@/_types/lume.ts";

export default function (props: LayoutProps) {
  assertRecipePost(props);
  const { title, date, tags, prep, cook, wait, servings, content } = props;

  return (
    <BaseLayout
      {...props}
      content={
        <article class="recipe-single">
          <h1>{title}</h1>
          <p>
            Last updated{" "}
            <time datetime={date.toISOString()}>{date.toDateString()}</time>
          </p>
          <ul class="taglist">
            {tags.map((tag) => (
              <li key={tag}>
                <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
              </li>
            ))}
          </ul>
          <RecipeTime prep={prep} cook={cook} wait={wait} />
          <p>Serves: {servings}</p>
          {content}
        </article>
      }
    />
  );
}
