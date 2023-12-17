import { description as animeDescription } from "./anime";
import { description as articleDescription } from "./articles";
import { description as bookDescription } from "./books";
import { description as gameDescription } from "./games";
import { description as mangaDescription } from "./manga";
import { description as movieDescription } from "./movies";
import { description as showDescription } from "./shows";
import { description as storyDescription } from "./stories";

export const title = "Recommendations";

const recList = [
  {
    title: "Anime",
    description: animeDescription.replace(/\.$/, ""),
    slug: "/recs/anime",
  },
  {
    title: "Articles",
    description: articleDescription.replace(/\.$/, ""),
    slug: "/recs/articles",
  },
  {
    title: "Books",
    description: bookDescription.replace(/\.$/, ""),
    slug: "/recs/books",
  },
  {
    title: "Games",
    description: gameDescription.replace(/\.$/, ""),
    slug: "/recs/games",
  },
  {
    title: "Manga",
    description: mangaDescription.replace(/\.$/, ""),
    slug: "/recs/manga",
  },
  {
    title: "Movies",
    description: movieDescription.replace(/\.$/, ""),
    slug: "/recs/movies",
  },
  {
    title: "Shows",
    description: showDescription.replace(/\.$/, ""),
    slug: "/recs/shows",
  },
  {
    title: "Stories",
    description: storyDescription.replace(/\.$/, ""),
    slug: "/recs/stories",
  },
];

export default function () {
  return (
    <section className="rec-section">
      <h1>Recommendations</h1>
      <p>
        Here I try to record lists of pretty much everything I&#39;ve ever read,
        watched, or played, and try to rate each piece of content accordingly. I
        recommend all sorts of books, movies, shows, and others based on my
        ratings and notes for each.
      </p>
      <p>
        See my&nbsp;
        <a href="/recs/rating-guide">rating guide</a>
        &nbsp;for more details on how I rate content.
      </p>
      <ol className="articlelist">
        {recList.map(({ title, description, slug }) => (
          <li key={slug}>
            <a href={slug}>
              <span>{title}</span>
              <span>{description}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
