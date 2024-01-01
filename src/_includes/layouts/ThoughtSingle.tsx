import BaseLayout from "@layouts/BaseLayout.tsx";
import { slugify } from "@/_utils/urls.ts";
import { assertThoughtPost } from "@/_utils/assertions.ts";
import type { LayoutProps } from "@/_types/lume.ts";

export default function (props: LayoutProps) {
  assertThoughtPost(props);
  const { title, date, tags, content } = props;
  return (
    <BaseLayout
      {...props}
      content={
        <article class="thoughtsingle">
          <h1>{title}</h1>
          <p>
            <time datetime={date.toISOString()}>{date.toDateString()}</time>
          </p>
          <ul class="dnp taglist">
            {tags.map((tag) => (
              <li>
                <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
              </li>
            ))}
          </ul>
          {content}
        </article>
      }
    />
  );
}
