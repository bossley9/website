import BaseLayout from "@layouts/BaseLayout.tsx";
import { assertTabPost } from "@/_utils/assertions.ts";
import { slugify } from "@/_utils/urls.ts";
import type { LayoutProps } from "@/_types/lume.ts";

export default function (props: LayoutProps) {
  assertTabPost(props);
  const { title, date, tags, bandcamp, soundcloud, spotify, youtube } = props;
  const content = String(props.page.data.content); // raw markdown content

  const mapKeyItems = {
    ["/"]: "slide up",
    ["\\"]: "slide down",
    ["h"]: "hammer-on",
    ["p"]: "pull-off",
    ["~"]: "vibrato",
    ["+"]: "harmonic",
    ["x"]: "mute note",
    ["*"]: "ring",
  };
  const mapKey = Object.entries(mapKeyItems)
    .map(([symbol, meaning]) => `${symbol}  ${meaning}`)
    .join("\n") + "\n";

  return (
    <BaseLayout
      {...props}
      content={
        <article class="tab-single">
          <h1>{title}</h1>
          <p>
            Last updated{" "}
            <time dateTime={date.toISOString()}>{date.toDateString()}</time>
          </p>
          <ul class="taglist dnp">
            {tags.map((tag) => (
              <li>
                <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
              </li>
            ))}
          </ul>
          <br class="dnp" />
          <ul class="taglist dnp">
            {bandcamp && (
              <li>
                <a href={bandcamp}>Bandcamp</a>
              </li>
            )}
            {soundcloud && (
              <li>
                <a href={soundcloud}>Soundcloud</a>
              </li>
            )}
            {spotify && (
              <li>
                <a href={spotify}>Spotify</a>
              </li>
            )}
            {youtube && (
              <li>
                <a href={youtube}>Youtube</a>
              </li>
            )}
          </ul>
          <pre>
            {mapKey}
            {"\n"}
            {content.trimStart()}
          </pre>
        </article>
      }
    />
  );
}
