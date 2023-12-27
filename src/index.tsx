import { About } from "@/_components/About.tsx";
import { ArticleListItem } from "@/_components/ArticleListItem.tsx";
import { assertThoughtPost } from "@/_utils/assertions.ts";
import { Layouts } from "@/_utils/constants.ts";

export const layout = Layouts.BaseLayout;

type Props = {
  search: Lume.Data["search"];
};

export default function ({ search }: Props) {
  const recentThoughts = search.pages("thought", "date=desc", 10);
  return (
    <>
      <About />
      <section>
        <h2>Recent Thoughts</h2>
        <ol class="articlelist">
          {recentThoughts.map((thought) => {
            assertThoughtPost(thought);
            const { date, title, url, video } = thought;
            return (
              <ArticleListItem
                title={title}
                date={date}
                url={url}
                isVideo={Boolean(video)}
              />
            );
          })}
        </ol>
        <p>
          <a href="/thoughts">more...</a>
        </p>
      </section>
    </>
  );
}
