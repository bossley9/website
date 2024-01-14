type DateString = string;
type YearString = string;

export type Anime =
  & ({
    title: string;
    title_translated?: string;
  } | {
    title?: string;
    title_translated: string;
  })
  & {
    date: YearString;
    rating: number;
    note?: string;
    current?: true;
  }
  & ({
    type: "anime";
    seasons: number;
    run_start: DateString;
    run_end: DateString | "present";
  } | {
    type: "anime/movie";
    year: YearString;
  });

export type Article = {
  type: "article" | "paper";
  title: string;
  author: string;
  url: string;
  published: DateString;
  date: YearString;
  note?: string;
};

export type Book = {
  type: "book";
  author: string;
  title: string;
  year: YearString;
  publisher: string;
  isbn: string;
  date: YearString;
  rating: number;
  note?: string;
  current?: true;
};

export type Game = {
  type: "game";
  title: string;
  year: YearString;
  developer?: string;
  publisher?: string;
  platform: string;
  url: string;
  date: YearString;
  rating: number;
  note?: string;
  current?: true;
};
