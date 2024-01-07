import BaseLayout from "@layouts/BaseLayout.tsx";
import { slugify } from "@/_utils/urls.ts";
import { assertStreamPost } from "@/_utils/assertions.ts";
import type { LayoutProps } from "@/_types/lume.ts";
import { InlineVideo } from "@/_components/InlineMedia.tsx";

export default function (props: LayoutProps) {
  assertStreamPost(props);
  const { title, date, tags, video, poster, content: description } = props;
  return (
    <BaseLayout
      {...props}
      content={
        <article class="streamsingle">
          <InlineVideo
            id="player"
            src={video}
            poster={poster}
            width="100%"
            preload="metadata"
          />
          <h1>{title}</h1>
          <div class="meta">
            <time datetime={date.toISOString()}>{date.toDateString()}</time>
            <ul class="dnp taglist">
              {tags.map((tag) => (
                <li>
                  <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
                </li>
              ))}
            </ul>
          </div>
          <div class="desc">
            {description}
          </div>
        </article>
      }
    />
  );
}
