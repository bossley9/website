type DateString = string;
type YearString = string;
type RunEndString = DateString | "present";

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
    run_end: RunEndString;
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

export type Manga =
  & {
    type: "manga";
    author: string;
    title: string;
    url: string;
    date: YearString;
    volumes: number;
    rating: number;
    note?: string;
    current?: true;
  }
  & ({ year: YearString } | {
    run_start: DateString;
    run_end: RunEndString;
  });

export type Movie = {
  type: "movie";
  title: string;
  year: YearString;
  director: string;
  writer?: string;
  producer: string;
  date: YearString;
  rating: number;
  note?: string;
};

export type Show =
  & {
    title: string;
    run_start: DateString;
    run_end: RunEndString;
    date: YearString;
    rating: number;
    note?: string;
    current?: true;
  }
  & (
    {
      type: "show";
      seasons: number;
    } | {
      type: "podcast";
      url: string;
    }
  );

export type Story = {
  type: "poem";
  author: string;
  title: string;
  url: string;
  date: YearString;
  rating: number;
  note?: string;
  current?: true;
};
