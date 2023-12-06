import { slugify } from "@/utils/urls";
import type { CollectionEntry } from "astro:content";

export type PageProps = {
  tab: CollectionEntry<"tabs">;
};

export function TabSingle({ tab }: PageProps) {
  const { title, date, tags, bandcamp, soundcloud, spotify, youtube } =
    tab.data;

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
  const mapKey =
    Object.entries(mapKeyItems)
      .map(([symbol, meaning]) => `${symbol}  ${meaning}`)
      .join("\n") + "\n";

  return (
    <article className="tab-single">
      <h1>{title}</h1>
      <p>
        Last updated{" "}
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </p>
      <ul className="taglist dnp">
        {tags.map((tag) => (
          <li key={tag}>
            <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
          </li>
        ))}
      </ul>
      <br className="dnp" />
      <ul className="taglist dnp">
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
        {tab.body}
      </pre>
    </article>
  );
}
