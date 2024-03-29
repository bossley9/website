import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { isValidString } from "@/_utils/assertions.ts";
import { slugify } from "@/_utils/urls.ts";
import { Layouts } from "@/_utils/constants.ts";

type Props = {
  search: Lume.Data["search"];
};

export default function* ({ search }: Props) {
  const tags = search.values<string>("tags");
  for (const tag of tags) {
    const pages = search.pages(`"${tag}"`); // quotes for multi-word tags
    yield {
      layout: Layouts.BaseLayout,
      url: `/tags/${slugify(tag)}/`,
      title: `Tagged "${tag}"`,
      content: (
        <section class="tagsingle">
          <h1>
            Tagged &#34;<span class="tagname">{tag}</span>&#34;
          </h1>
          <ol class="articlelist">
            {pages.map(({ date, title, url }) => {
              if (!isValidString(title) || !isValidString(url)) {
                throw Error(`page ${url} is invalid`);
              }
              return <ArticleListItem date={date} title={title} url={url} />;
            })}
          </ol>
        </section>
      ),
    };
  }
}
