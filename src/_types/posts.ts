import type { Data } from "lume/core/file.ts";

export interface ThoughtPost extends Data {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  image?: string;
  video?: string;
  thumbnail?: string;
  captions?: string;
}

export interface TabPost extends Data {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  difficulty: "beginner" | "easy" | "medium" | "hard" | "difficult";
  bandcamp?: string;
  soundcloud?: string;
  spotify?: string;
  youtube?: string;
}

export interface PoemPost extends Data {
  title: string;
  date: Date;
  description?: string;
  tags: string[];
}

export interface RecipePost extends Data {
  title: string;
  description?: string;
  date: Date;
  tags: string[];
  servings: number;
  prep?: number;
  cook?: number;
  wait?: number;
}

export interface RecPoemPost extends Data {
  title: string;
  author: string;
  year?: string;
  note?: string;
}

export interface StreamPost extends Data {
  title: string;
  date: Date;
  video: string;
  poster: string;
}

export type Playlist = {
  file: string;
  comment?: string;
}[];
