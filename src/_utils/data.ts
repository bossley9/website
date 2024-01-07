import animeData from "@/_data/recs/anime.json" with { type: "json" };
import bookData from "@/_data/recs/books.json" with { type: "json" };
import mangaData from "@/_data/recs/manga.json" with { type: "json" };
import showData from "@/_data/recs/shows.json" with { type: "json" };
import {
  type Anime,
  animeListSchema,
  type Book,
  bookListSchema,
  type Manga,
  mangaListSchema,
  type Show,
  showListSchema,
} from "@/_utils/schemas.ts";
import { fromZodError, ZodError } from "@deps";

export function getCurrentlyReadingItem(): Book | Manga | null {
  let bookList: Book[] = [];
  try {
    bookList = bookListSchema.parse(bookData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }
  const book = bookList.find((item) => item.current);
  if (book) {
    return book;
  }

  let mangaList: Manga[] = [];
  try {
    mangaList = mangaListSchema.parse(mangaData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }
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
  let showList: Show[] = [];
  try {
    showList = showListSchema.parse(showData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }
  const show = showList.find((item) => item.current);
  if (show) {
    return show;
  }

  let animeList: Anime[] = [];
  try {
    animeList = animeListSchema.parse(animeData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }
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
