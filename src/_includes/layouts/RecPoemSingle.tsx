import BaseLayout from "@layouts/BaseLayout.tsx";
import { assertRecPoemPost } from "@/_utils/assertions.ts";
import type { LayoutProps } from "@/_types/lume.ts";

export default function (props: LayoutProps) {
  assertRecPoemPost(props);
  const { title, author, note, year } = props;
  const content = String(props.page.data.content); // raw markdown content
  return (
    <BaseLayout
      {...props}
      title={`${title} by ${author}`}
      content={
        <article class="poem-single">
          <h1>
            <cite>{title}</cite> by {author}
          </h1>
          {note && <p>{note}</p>}
          {year && <p>Written in {year}.</p>}
          <pre>{content.trimStart()}</pre>
          <br />
          <small>
            I do not claim ownership for any of this writing. I only host it
            here because the sources for these works are often inaccessible or
            go missing and I want to preserve the beautiful works of these
            authors for others to enjoy.
          </small>
          <small>
            If you are an author of this work and would like to have it removed,
            please contact me.
          </small>
        </article>
      }
    />
  );
}
