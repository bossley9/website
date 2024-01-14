import { z } from "@deps";

const ratingSchema = z.number().gte(-1).lte(10);
const dateSchema = z.string().regex(/\d\d\d\d/);
const currentSchema = z.literal(true).optional();
const runEndSchema = z.union([z.coerce.date(), z.literal("present")]);

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
