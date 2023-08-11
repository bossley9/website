import bookData from "@/data/recs/books.json";
import mangaData from "@/data/recs/manga.json";
import {
  type Book,
  bookListSchema,
  type Manga,
  mangaListSchema,
} from "@/utils/schemas";
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
