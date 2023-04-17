import { z } from 'zod'

const ratingSchema = z.number().gte(-1).lte(10)
const dateSchema = z.string().regex(/\d\d\d\d/)
const currentSchema = z.literal(true).optional()
const runEndSchema = z.union([z.coerce.date(), z.literal('present')])

export const animeListSchema = z.array(
  z.intersection(
    z.intersection(
      z
        .object({
          title: z.string(),
          title_translated: z.string(),
        })
        .partial()
        .refine(
          (data) => data.title || data.title_translated,
          'one of "title" or "title_translated" must be present'
        ),
      z.object({
        date: dateSchema,
        rating: ratingSchema,
        note: z.string().optional(),
        current: currentSchema,
      })
    ),
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('anime'),
        seasons: z.number(),
        run_start: z.coerce.date(),
        run_end: runEndSchema,
      }),
      z.object({
        type: z.literal('anime/movie'),
        year: dateSchema,
      }),
    ])
  )
)
export type AnimeList = z.infer<typeof animeListSchema>

export const articleListSchema = z.array(
  z.object({
    type: z.union([z.literal('article'), z.literal('paper')]),
    title: z.string(),
    author: z.string(),
    url: z.string().url(),
    published: z.coerce.date(),
    date: dateSchema,
    note: z.string().optional(),
  })
)
export type ArticleList = z.infer<typeof articleListSchema>

export const bookListSchema = z.array(
  z.object({
    type: z.literal('book'),
    author: z.string(),
    title: z.string(),
    year: dateSchema,
    publisher: z.string(),
    isbn: z.string().regex(/\d\d\d\d\d\d\d\d\d\d\d\d\d/),
    date: dateSchema,
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  })
)
export type BookList = z.infer<typeof bookListSchema>

export const gameListSchema = z.array(
  z.object({
    type: z.literal('game'),
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
  })
)
export type GameList = z.infer<typeof gameListSchema>

export const mangaListSchema = z.array(
  z.object({
    type: z.literal('manga'),
    author: z.string(),
    title: z.string(),
    run_start: z.coerce.date(),
    run_end: runEndSchema,
    url: z.string().url(),
    date: dateSchema,
    volumes: z.number(),
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  })
)
export type MangaList = z.infer<typeof mangaListSchema>

export const movieListSchema = z.array(
  z.object({
    type: z.literal('movie'),
    title: z.string(),
    year: dateSchema,
    director: z.string(),
    producer: z.string(),
    date: dateSchema,
    rating: ratingSchema,
    note: z.string().optional(),
  })
)
export type MovieList = z.infer<typeof movieListSchema>

export const showListSchema = z.array(
  z.intersection(
    z.object({
      title: z.string(),
      run_start: z.coerce.date(),
      run_end: runEndSchema,
      date: dateSchema,
      rating: ratingSchema,
      note: z.string().optional(),
      current: currentSchema,
    }),
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('show'),
        seasons: z.number(),
      }),
      z.object({
        type: z.literal('podcast'),
        url: z.string().url(),
      }),
    ])
  )
)
export type ShowList = z.infer<typeof showListSchema>

export const storyListSchema = z.array(
  z.object({
    type: z.literal('poem'),
    author: z.string(),
    title: z.string(),
    url: z.string(), // relative URLs may be present
    date: dateSchema,
    rating: ratingSchema,
    note: z.string().optional(),
    current: currentSchema,
  })
)
export type StoryList = z.infer<typeof storyListSchema>
