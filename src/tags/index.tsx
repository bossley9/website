import React from "react";
import { sortByAlpha } from "@/_utils/sorting.ts";
import { slugify } from "@/_utils/urls.ts";

export const title = "Tag Index";

type Props = {
  search: Lume.Data["search"];
};

export default function ({ search }: Props) {
  const tags = search.values<string>("tags").sort(sortByAlpha);
  return (
    <section class="tag-index">
      <h1>Tag Index</h1>
      <ol>
        {tags.map((tag) => (
          <li>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ol>
    </section>
  );
}
