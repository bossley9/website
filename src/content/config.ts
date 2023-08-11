import { z, defineCollection } from "astro:content";

export const collections = {
  ["thoughts"]: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      image: z.string().optional(),
      video: z.string().url().optional(),
      thumbnail: z.string().url().optional(),
      captions: z.string().url().optional(),
    }),
  }),
  ["tabs"]: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      difficulty: z.enum(["beginner", "easy", "medium", "hard", "difficult"]),
      bandcamp: z.string().url().optional(),
      soundcloud: z.string().url().optional(),
      spotify: z.string().url().optional(),
      youtube: z.string().url().optional(),
    }),
  }),
  ["poems"]: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      description: z.string().optional(),
    }),
  }),
  ["recipes"]: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.date(),
      tags: z.array(z.string()),
      servings: z.number(),
      prep: z.number().optional(),
      cook: z.number().optional(),
      wait: z.number().optional(),
    }),
  }),
  ["rec-poems"]: defineCollection({
    schema: z.object({
      title: z.string(),
      author: z.string(),
      year: z.string().optional(),
      note: z.string().optional(),
    }),
  }),
};
