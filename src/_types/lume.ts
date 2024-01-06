import type { Data } from "lume/core/file.ts";

export type LayoutProps = Partial<Data> & {
  content?: JSX.Element;
};

export type DataLike = { date: Date | string };
