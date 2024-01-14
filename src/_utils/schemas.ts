import { z } from "@deps";

const ratingSchema = z.number().gte(-1).lte(10);
const dateSchema = z.string().regex(/\d\d\d\d/);
const currentSchema = z.literal(true).optional();
const runEndSchema = z.union([z.coerce.date(), z.literal("present")]);

const articleSchema = z.object({
  type: z.union([z.literal("article"), z.literal("paper")]),
  title: z.string(),
  author: z.string(),
  url: z.string().url(),
  published: z.coerce.date(),
  date: dateSchema,
  note: z.string().optional(),
});
export const articleListSchema = z.array(articleSchema);
export type Article = z.infer<typeof articleSchema>;

const bookSchema = z.object({
  type: z.literal("book"),
  author: z.string(),
  title: z.string(),
  year: dateSchema,
  publisher: z.string(),
  isbn: z.string().regex(/\d\d\d\d\d\d\d\d\d\d\d\d\d/),
  date: dateSchema,
  rating: ratingSchema,
  note: z.string().optional(),
  current: currentSchema,
});
export const bookListSchema = z.array(bookSchema);
export type Book = z.infer<typeof bookSchema>;

const gameSchema = z.object({
  type: z.literal("game"),
  title: z.string(),
  year: dateSchema,
  developer: z.string().optional(),
  publisher: z.string().optional(),
  platform: z.string(),
  url: z.string().url(),
  date: dateSchema,
  rating: ratingSchema,
  note: z.string().optional(),
  current: currentSchema,
});
export const gameListSchema = z.array(gameSchema);
export type Game = z.infer<typeof gameSchema>;

const mangaSchema = z.intersection(
  z.object({
    type: z.literal("manga"),
    author: z.string(),
    title: z.string(),
    url: z.string().url(),
    date: dateSchema,
    volumes: z.number(),
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  }),
  z.union([
    z.object({
      year: dateSchema,
    }),
    z.object({
      run_start: z.coerce.date(),
      run_end: runEndSchema,
    }),
  ]),
);
export const mangaListSchema = z.array(mangaSchema);
export type Manga = z.infer<typeof mangaSchema>;

const movieSchema = z.object({
  type: z.literal("movie"),
  title: z.string(),
  year: dateSchema,
  director: z.string(),
  writer: z.string().optional(),
  producer: z.string(),
  date: dateSchema,
  rating: ratingSchema,
  note: z.string().optional(),
});
export const movieListSchema = z.array(movieSchema);
export type Movie = z.infer<typeof movieSchema>;

const showSchema = z.intersection(
  z.object({
    title: z.string(),
    run_start: z.coerce.date(),
    run_end: runEndSchema,
    date: dateSchema,
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  }),
  z.discriminatedUnion("type", [
    z.object({
      type: z.literal("show"),
      seasons: z.number(),
    }),
    z.object({
      type: z.literal("podcast"),
      url: z.string().url(),
    }),
  ]),
);
export const showListSchema = z.array(showSchema);
export type Show = z.infer<typeof showSchema>;

const storySchema = z.object({
  type: z.literal("poem"),
  author: z.string(),
  title: z.string(),
  url: z.string(), // relative URLs may be present
  date: dateSchema,
  rating: ratingSchema,
  note: z.string().optional(),
  current: currentSchema,
});
export const storyListSchema = z.array(storySchema);
export type Story = z.infer<typeof storySchema>;
