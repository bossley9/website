import animeData from "@/data/recs/anime.json";
import bookData from "@/data/recs/books.json";
import mangaData from "@/data/recs/manga.json";
import showData from "@/data/recs/shows.json";
import {
  type Anime,
  animeListSchema,
  type Book,
  bookListSchema,
  type Manga,
  mangaListSchema,
  type Show,
  showListSchema,
} from "@/_utils/schemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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
