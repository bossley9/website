import { z, defineCollection } from 'astro:content'

export const collections = {
  ['thoughts']: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      image: z.string().optional(),
    }),
  }),
  ['tabs']: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      difficulty: z.enum(['beginner', 'easy', 'medium', 'hard', 'difficult']),
      bandcamp: z.string().url().optional(),
      soundcloud: z.string().url().optional(),
      spotify: z.string().url().optional(),
      youtube: z.string().url().optional(),
    }),
  }),
  ['poems']: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string().optional(),
    }),
  }),
  ['recipes']: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.date(),
      tags: z.array(z.string()),
      prep: z.string().optional(),
      cook: z.string().optional(),
      wait: z.string().optional(),
      servings: z.number(),
    }),
  }),
  ['rec-poems']: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      year: z.string().optional(),
      note: z.string().optional(),
    }),
  }),
}