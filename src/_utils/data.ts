import animeData from "@/_data/recs/anime.json" with { type: "json" };
import bookData from "@/_data/recs/books.json" with { type: "json" };
import mangaData from "@/_data/recs/manga.json" with { type: "json" };
import showData from "@/_data/recs/shows.json" with { type: "json" };
import {
  assertAnimeList,
  assertBookList,
  assertMangaList,
  assertShowList,
} from "@/_utils/assertions.ts";
import type { Anime, Book, Manga, Show } from "@/_types/data.ts";

export function getCurrentlyReadingItem(): Book | Manga | null {
  assertBookList(bookData);
  const bookList: Book[] = bookData;
  const book = bookList.find((item) => item.current);
  if (book) {
    return book;
  }

  assertMangaList(mangaData);
  const mangaList: Manga[] = mangaData;
  const manga = mangaList.find((item) => item.current);
  if (manga) {
    return manga;
  }

  return null;
}

export function getReadingItemURL(item: Book | Manga): string {
  if (item.type === "manga") {
    return item.url;
  } else {
    return `https://isbnsearch.org/isbn/${item.isbn}`;
  }
}

export function getCurrentlyWatchingItem(): Show | Anime | null {
  assertShowList(showData);
  const showList: Show[] = showData;
  const show = showList.find((item) => item.current);
  if (show) {
    return show;
  }

  assertAnimeList(animeData);
  const animeList: Anime[] = animeData;
  const anime = animeList.find((item) => item.current);
  if (anime) {
    return anime;
  }

  return null;
}

export function getWatchingItemTitle(watchingItem: Show | Anime): string {
  if ("title_translated" in watchingItem) {
    return watchingItem.title_translated || watchingItem.title || "";
  }

  return watchingItem.title || "";
}

export function getRatingClass(rating: number): string {
  if (rating >= 9.0) {
    return "stier";
  } else if (rating >= 8.0) {
    return "atier";
  } else {
    return "";
  }
}
