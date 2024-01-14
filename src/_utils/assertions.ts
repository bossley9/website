import type { Data } from "lume/core/file.ts";
import type {
  PoemPost,
  RecipePost,
  RecPoemPost,
  StreamPost,
  TabPost,
  ThoughtPost,
} from "@/_types/posts.ts";
import type {
  Anime,
  Article,
  Book,
  Game,
  Manga,
  Movie,
  Show,
  Story,
} from "@/_types/data.ts";

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

function isValidEndDateString(x: unknown): x is string {
  return isValidDateString(x) || x === "present";
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
    if (!isValidEndDateString(item.run_end)) {
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
    throw Error("Anime list is invalid");
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
    throw Error("Article list is invalid");
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
    throw Error("Book list is invalid");
  }
  for (const item of list) {
    assertBookData(item);
  }
}

function assertGameData(
  item: Partial<Game>,
): asserts item is Game {
  if (item.type !== "game") {
    throw Error(`Game type ${item.type} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Game title ${item.title} is invalid`);
  }
  if (!isValidYear(item.year)) {
    throw Error(`Game year ${item.year} is invalid`);
  }
  if (!isOptionalString(item.developer)) {
    throw Error(`Game developer ${item.developer} is invalid`);
  }
  if (!isOptionalString(item.publisher)) {
    throw Error(`Game publisher ${item.publisher} is invalid`);
  }
  if (!isValidString(item.platform)) {
    throw Error(`Game platform ${item.platform} is invalid`);
  }
  if (!isValidURL(item.url)) {
    throw Error(`Game url ${item.url} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Game date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Game rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Game note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Game current ${item.current} is invalid`);
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

function assertMangaData(
  item: Partial<Manga>,
): asserts item is Manga {
  if (item.type !== "manga") {
    throw Error(`Manga type ${item.type} is invalid`);
  }
  if (!isValidString(item.author)) {
    throw Error(`Manga author ${item.author} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Manga title ${item.title} is invalid`);
  }
  if (!isValidURL(item.url)) {
    throw Error(`Manga url ${item.url} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Manga date ${item.date} is invalid`);
  }
  if (typeof item.volumes !== "number") {
    throw Error(`Manga volumes ${item.volumes} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Manga rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Manga note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Manga current ${item.current} is invalid`);
  }
  if ("year" in item) {
    if (!isValidYear(item.year)) {
      throw Error(`Manga year ${item.year} is invalid`);
    }
  } else if ("run_start" in item && "run_end" in item) {
    if (!isValidDateString(item.run_start)) {
      throw Error(`Manga run_start ${item.run_start} is invalid`);
    }
    if (!isValidEndDateString(item.run_end)) {
      throw Error(`Manga run_end ${item.run_end} is invalid`);
    }
  } else {
    throw Error("Manga at least one of year or run_start must be present");
  }
}

export function assertMangaList(
  list: unknown,
): asserts list is Manga[] {
  if (!Array.isArray(list)) {
    throw Error("Manga list is invalid");
  }
  for (const item of list) {
    assertMangaData(item);
  }
}

function assertMovieData(
  item: Partial<Movie>,
): asserts item is Movie {
  if (item.type !== "movie") {
    throw Error(`Movie type ${item.type} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Movie title ${item.title} is invalid`);
  }
  if (!isValidYear(item.year)) {
    throw Error(`Movie year ${item.year} is invalid`);
  }
  if (!isValidString(item.director)) {
    throw Error(`Movie director ${item.director} is invalid`);
  }
  if (!isOptionalString(item.writer)) {
    throw Error(`Movie writer ${item.writer} is invalid`);
  }
  if (!isValidString(item.producer)) {
    throw Error(`Movie producer ${item.producer} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Movie date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Movie rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Movie note ${item.note} is invalid`);
  }
}

export function assertMovieList(
  list: unknown,
): asserts list is Movie[] {
  if (!Array.isArray(list)) {
    throw Error("Movie list is invalid");
  }
  for (const item of list) {
    assertMovieData(item);
  }
}

function assertShowData(
  item: Partial<Show>,
): asserts item is Show {
  if (!isValidString(item.title)) {
    throw Error(`Show title ${item.title} is invalid`);
  }
  if (!isValidDateString(item.run_start)) {
    throw Error(`Show run_start ${item.run_start} is invalid`);
  }
  if (!isValidEndDateString(item.run_end)) {
    throw Error(`Show run_end ${item.run_end} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Show date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Show rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Show note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Show current ${item.current} is invalid`);
  }
  if (item.type === "show") {
    if (typeof item.seasons !== "number") {
      throw Error(`Show seasons ${item.seasons} is invalid`);
    }
  } else if (item.type === "podcast") {
    if (!isValidURL(item.url)) {
      throw Error(`Show url ${item.url} is invalid`);
    }
  } else {
    throw Error(`Show type ${item.type} is invalid`);
  }
}

export function assertShowList(
  list: unknown,
): asserts list is Show[] {
  if (!Array.isArray(list)) {
    throw Error("Show list is invalid");
  }
  for (const item of list) {
    assertShowData(item);
  }
}

function assertStoryData(
  item: Partial<Story>,
): asserts item is Story {
  if (item.type !== "poem") {
    throw Error(`Story type ${item.type} is invalid`);
  }
  if (!isValidString(item.author)) {
    throw Error(`Story author ${item.author} is invalid`);
  }
  if (!isValidString(item.title)) {
    throw Error(`Story title ${item.title} is invalid`);
  }
  // cannot coerce because relative URLS may be present
  if (!isValidString(item.url)) {
    throw Error(`Story url ${item.url} is invalid`);
  }
  if (!isValidYear(item.date)) {
    throw Error(`Story date ${item.date} is invalid`);
  }
  if (!isValidRating(item.rating)) {
    throw Error(`Story rating ${item.rating} is invalid`);
  }
  if (!isOptionalString(item.note)) {
    throw Error(`Story note ${item.note} is invalid`);
  }
  if (!isOptionalCurrent(item.current)) {
    throw Error(`Story current ${item.current} is invalid`);
  }
}

export function assertStoryList(list: unknown): asserts list is Story[] {
  if (!Array.isArray(list)) {
    throw Error("Story list is invalid");
  }
  for (const item of list) {
    assertStoryData(item);
  }
}
