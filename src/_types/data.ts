export type Anime =
  & ({
    title: string;
    title_translated?: string;
  } | {
    title?: string;
    title_translated: string;
  })
  & {
    date: string;
    rating: number;
    note?: string;
    current?: true;
  }
  & ({
    type: "anime";
    seasons: number;
    run_start: string;
    run_end: string | "present";
  } | {
    type: "anime/movie";
    year: string;
  });
