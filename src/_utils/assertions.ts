import type { Data } from "lume/core/file.ts";
import type {
  PoemPost,
  RecipePost,
  RecPoemPost,
  StreamPost,
  TabPost,
  ThoughtPost,
} from "@/_types/posts.ts";
import type { Anime, Article, Book, Game } from "@/_types/data.ts";

export function isValidString(x: unknown): x is string {
  return typeof x === "string" && x.length > 0;
}

function isValidDate(x: unknown): x is Date {
  return x instanceof Date && !isNaN(x.valueOf());
}

function isValidTags(x: unknown): x is string[] {
  return typeof x === "object" && Array.isArray(x) && x.length > 0;
}

function isOptionalString(x: unknown): x is string | undefined {
  return (typeof x === "string" && x.length > 0) || typeof x === "undefined";
}

function isValidURL(x: unknown): x is string {
  if (typeof x !== "string") return false;
  try {
    new URL(x);
    return true;
  } catch {
    return false;
  }
}

function isOptionalURL(x: unknown): x is string | undefined {
  if (typeof x === "undefined") return true;
  if (typeof x !== "string") return false;
  return isValidURL(x);
}

function isOptionalNumber(x: unknown): x is number | undefined {
  if (typeof x === "undefined") return true;
  if (typeof x !== "number") return false;
  return x >= 0;
}

function isValidYear(x: unknown): x is string {
  return typeof x === "string" && x.length === 4 &&
    !Number.isNaN(Number.parseInt(x));
}

function isValidRating(x: unknown): x is number {
  return typeof x === "number" && x >= -1 && x <= 10;
}

function isOptionalCurrent(x: unknown): x is true | undefined {
  return (typeof x === "boolean" && x === true) || typeof x === "undefined";
}

function isValidDateString(x: unknown): x is string {
  return typeof x === "string" && x.length > 0 && !Number.isNaN(Date.parse(x));
}

export function assertTimestamp(t: string): asserts t is string {
  if (!/^(\d\d:)?\d\d:\d\d$/.test(t)) {
    throw Error(`${t} is not a valid timestamp`);
  }
}

export function assertThoughtPost(
  post: Partial<Data>,
): asserts post is ThoughtPost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isValidString(post.description)) {
    throw Error(`${post.url} post.description is invalid`);
  }
  if (!isValidDate(post.date)) {
    throw Error(`${post.url} post.date is invalid`);
  }
  if (!isValidTags(post.tags)) {
    throw Error(`${post.url} post.tags is invalid`);
  }
  if (!isOptionalString(post.image)) {
    throw Error(`${post.url} post.image is invalid`);
  }
  if (!isOptionalURL(post.video)) {
    throw Error(`${post.url} post.video is invalid`);
  }
  if (!isOptionalURL(post.thumbnail)) {
    throw Error(`${post.url} post.thumbnail is invalid`);
  }
  if (!isOptionalURL(post.captions)) {
    throw Error(`${post.url} post.captions is invalid`);
  }
}

const tabPostDifficulties = ["beginner", "easy", "medium", "hard", "difficult"];
export function assertTabPost(
  post: Partial<Data>,
): asserts post is TabPost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isValidString(post.description)) {
    throw Error(`${post.url} post.description is invalid`);
  }
  if (!isValidDate(post.date)) {
    throw Error(`${post.url} post.date is invalid`);
  }
  if (!isValidTags(post.tags)) {
    throw Error(`${post.url} post.tags is invalid`);
  }
  if (
    typeof post.difficulty !== "string" ||
    !tabPostDifficulties.includes(post.difficulty)
  ) {
    throw Error(`${post.url} post.difficulty is invalid`);
  }
  if (!isOptionalURL(post.bandcamp)) {
    throw Error(`${post.url} post.bandcamp is invalid`);
  }
  if (!isOptionalURL(post.soundcloud)) {
    throw Error(`${post.url} post.soundcloud is invalid`);
  }
  if (!isOptionalURL(post.spotify)) {
    throw Error(`${post.url} post.spotify is invalid`);
  }
  if (!isOptionalURL(post.youtube)) {
    throw Error(`${post.url} post.youtube is invalid`);
  }
}

export function assertPoemPost(
  post: Partial<Data>,
): asserts post is PoemPost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isValidDate(post.date)) {
    throw Error(`${post.url} post.date is invalid`);
  }
  if (!isOptionalString(post.description)) {
    throw Error(`${post.url} post.description is invalid`);
  }
  if (!isValidTags(post.tags)) {
    throw Error(`${post.url} post.tags is invalid`);
  }
}

export function assertRecipePost(
  post: Partial<Data>,
): asserts post is RecipePost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isOptionalString(post.description)) {
    throw Error(`${post.url} post.description is invalid`);
  }
  if (!isValidDate(post.date)) {
    throw Error(`${post.url} post.date is invalid`);
  }
  if (!isValidTags(post.tags)) {
    throw Error(`${post.url} post.tags is invalid`);
  }
  if (typeof post.servings !== "number" || post.servings <= 0) {
    throw Error(`${post.url} post.servings is invalid`);
  }
  if (!isOptionalNumber(post.prep)) {
    throw Error(`${post.url} post.prep is invalid`);
  }
  if (!isOptionalNumber(post.cook)) {
    throw Error(`${post.url} post.cook is invalid`);
  }
  if (!isOptionalNumber(post.wait)) {
    throw Error(`${post.url} post.wait is invalid`);
  }
}

export function assertRecPoemPost(
  post: Partial<Data>,
): asserts post is RecPoemPost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isValidString(post.author)) {
    throw Error(`${post.url} post.author is invalid`);
  }
  if (!isOptionalString(post.year)) {
    throw Error(`${post.url} post.year is invalid`);
  }
  if (!isOptionalString(post.note)) {
    throw Error(`${post.url} post.note is invalid`);
  }
}

export function assertStreamPost(
  post: Partial<Data>,
): asserts post is StreamPost {
  if (!isValidString(post.title)) {
    throw Error(`${post.url} post.title is invalid`);
  }
  if (!isValidDate(post.date)) {
    throw Error(`${post.url} post.date is invalid`);
  }
  if (!isValidURL(post.video)) {
    throw Error(`${post.url} post.video is invalid`);
  }
  if (!isValidURL(post.poster)) {
    throw Error(`${post.url} post.poster is invalid`);
  }
}

function assertAnimeData(
  item: Partial<Anime>,
): asserts item is Anime {
  if (!isValidString(item.title) && !isValidString(item.title_translated)) {
    throw Error(
      "Anime at least one of title or title_translated must be present",
    );
  }
  if (!isValidYear(item.date)) {
    throw Error(`Anime date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Anime rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Anime note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Anime current ${item.current} is invalid`);
  }
  if (item.type === "anime") {
    if (typeof item.seasons !== "number") {
      throw Error(`Anime seasons ${item.seasons} is invalid`);
    }
    if (!isValidDateString(item.run_start)) {
      throw Error(`Anime run_start ${item.run_start} is invalid`);
    }
    if (!isValidDateString(item.run_end) && item.run_end !== "present") {
      throw Error(`Anime run_end ${item.run_end} is invalid`);
    }
  } else if (item.type === "anime/movie") {
    if (!isValidYear(item.year)) {
      throw Error(`Anime year ${item.year} is invalid`);
    }
  } else {
    throw Error(`Anime type ${item.type} is invalid`);
  }
}

export function assertAnimeList(
  list: unknown,
): asserts list is Anime[] {
  if (!Array.isArray(list)) {
    throw Error("anime list is invalid");
  }
  for (const item of list) {
    assertAnimeData(item);
  }
}

function assertArticleData(
  item: Partial<Article>,
): asserts item is Article {
  if (item.type !== "article" && item.type !== "paper") {
    throw Error(`Article type ${item.type} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Article title ${item.title} is invalid`);
  }
  if (!isValidString(item.author)) {
    throw Error(`Article author ${item.author} is invalid`);
  }
  if (!isValidURL(item.url)) {
    throw Error(`Article url ${item.url} is invalid`);
  }
  if (!isValidDateString(item.published)) {
    throw Error(`Article published ${item.published} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Article date ${item.date} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Article note ${item.note} is invalid`);
  }
}

export function assertArticleList(
  list: unknown,
): asserts list is Article[] {
  if (!Array.isArray(list)) {
    throw Error("article list is invalid");
  }
  for (const item of list) {
    assertArticleData(item);
  }
}

function assertBookData(
  item: Partial<Book>,
): asserts item is Book {
  if (item.type !== "book") {
    throw Error(`Book type ${item.type} is invalid`);
  }
  if (!isValidString(item.author)) {
    throw Error(`Book author ${item.author} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Book title ${item.title} is invalid`);
  }
  if (!isValidYear(item.year)) {
    throw Error(`Book year ${item.year} is invalid`);
  }
  if (!isValidString(item.publisher)) {
    throw Error(`Book publisher ${item.publisher} is invalid`);
  }
  const isValidISBN = isValidString(item.isbn) && item.isbn.length === 13 &&
    /^\d+$/.test(item.isbn);
  if (!isValidISBN) {
    throw Error(`Book isbn ${item.isbn} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Book date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Book rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Book note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Book current ${item.current} is invalid`);
  }
}

export function assertBookList(
  list: unknown,
): asserts list is Book[] {
  if (!Array.isArray(list)) {
    throw Error("book list is invalid");
  }
  for (const item of list) {
    assertBookData(item);
  }
}

function assertGameData(
  item: Partial<Game>,
): asserts item is Game {
  if (item.type !== "game") {
    throw Error(`game type ${item.type} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`game title ${item.title} is invalid`);
  }
  if (!isValidYear(item.year)) {
    throw Error(`game year ${item.year} is invalid`);
  }
  if (!isOptionalString(item.developer)) {
    throw Error(`game developer ${item.developer} is invalid`);
  }
  if (!isOptionalString(item.publisher)) {
    throw Error(`game publisher ${item.publisher} is invalid`);
  }
  if (!isValidString(item.platform)) {
    throw Error(`game platform ${item.platform} is invalid`);
  }
  if (!isValidURL(item.url)) {
    throw Error(`game url ${item.url} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`game date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`game rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`game note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`game current ${item.current} is invalid`);
  }
}

export function assertGameList(
  list: unknown,
): asserts list is Game[] {
  if (!Array.isArray(list)) {
    throw Error("game list is invalid");
  }
  for (const item of list) {
    assertGameData(item);
  }
}
