import { getObjectEntries } from "@/_utils/object.ts";
import type { Data } from "lume/core/file.ts";

export function groupEntriesByYear<T extends { date: Date }>(
  entries: T[],
): [number, T[]][] {
  const groupedEntries = entries.reduce<Record<number, T[]>>((acc, val) => {
    const key = val.date.getUTCFullYear();
    if (acc[key]) {
      acc[key] = [...acc[key], val];
    } else {
      acc[key] = [val];
    }
    return acc;
  }, {});
  return getObjectEntries(groupedEntries).sort(([a], [b]) => b - a);
}

export type CustomPage<T> = {
  url: string;
  data: T[];
  currentPage: number;
  lastPage: number;
};

export function customPagination<T>(data: T[], path: string): CustomPage<T>[] {
  const pageSize = 15;
  const totalNumPages = Math.ceil(data.length / pageSize);
  const staticPaths: CustomPage<T>[] = [];

  for (let i = 1; i <= totalNumPages; i++) {
    const pageSlug = i === 1 ? "" : "page/" + i;
    const pageData: CustomPage<T> = {
      url: `${path}/${pageSlug}/`,
      data: data.slice((i - 1) * pageSize, i * pageSize),
      currentPage: i,
      lastPage: totalNumPages,
    };
    staticPaths.push(pageData);
  }

  return staticPaths;
}

type ThoughtPage = {
  year: number;
  url: string;
  data: Data[];
  years: number[];
};
export function thoughtPagination(
  data: Data[],
): ThoughtPage[] {
  const sortedPages = groupEntriesByYear(data);
  const years = sortedPages.map(([year]) => year);

  return sortedPages.map(([year, collection], i): ThoughtPage => {
    const pageSlug = i === 0 ? "" : "page/" + year;
    return {
      year,
      url: `/thoughts/${pageSlug}/`,
      data: collection,
      years,
    };
  });
}
