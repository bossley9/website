import { description as animeDescription } from "@/recs/anime.tsx";
import { description as articleDescription } from "@/recs/articles.tsx";
import { description as bookDescription } from "@/recs/books.tsx";
import { description as gameDescription } from "@/recs/games.tsx";
import { description as mangaDescription } from "@/recs/manga.tsx";
import { description as movieDescription } from "@/recs/movies.tsx";
import { description as showDescription } from "@/recs/shows.tsx";
import { description as storyDescription } from "@/recs/stories.tsx";

export const title = "Recommendations";

const recList = [
  {
    title: "Anime",
    description: animeDescription,
    slug: "/recs/anime",
  },
  {
    title: "Articles",
    description: articleDescription,
    slug: "/recs/articles",
  },
  {
    title: "Books",
    description: bookDescription,
    slug: "/recs/books",
  },
  {
    title: "Games",
    description: gameDescription,
    slug: "/recs/games",
  },
  {
    title: "Manga",
    description: mangaDescription,
    slug: "/recs/manga",
  },
  {
    title: "Movies",
    description: movieDescription,
    slug: "/recs/movies",
  },
  {
    title: "Shows",
    description: showDescription,
    slug: "/recs/shows",
  },
  {
    title: "Stories",
    description: storyDescription,
    slug: "/recs/stories",
  },
];

export default function () {
  return (
    <section class="recsection">
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
      <ol class="articlelist">
        {recList.map(({ title, description, slug }) => (
          <li>
            <a href={slug}>
              <span>{title}</span>
              <span>{description.replace(/\.$/, "")}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
