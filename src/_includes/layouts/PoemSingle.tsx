import BaseLayout from "@layouts/BaseLayout.tsx";
import { assertPoemPost } from "@/_utils/assertions.ts";
import type { LayoutProps } from "@/_types/lume.ts";

export default function (props: LayoutProps) {
  assertPoemPost(props);
  const { title, date, description } = props;
  const content = String(props.page.data.content); // raw markdown content

  return (
    <BaseLayout
      {...props}
      content={
        <article class="poem-single">
          <h1>{title}</h1>
          <p>
            <time datetime={date.toISOString()}>{date.toDateString()}</time>
          </p>
          {description && (
            <p>
              <i>{description}</i>
            </p>
          )}
          <pre>
            {content.trimStart()}
          </pre>
        </article>
      }
    />
  );
}
