import { getObjectEntries } from "@/utils/object";
import type { GetStaticPathsResult } from "astro";
import type { CollectionEntry } from "astro:content";

export type CustomPage<T> = {
  data: T[];
  currentPage: number;
  lastPage: number;
};

export function customPagination<T>(data: T[]): GetStaticPathsResult {
  const pageSize = 15;
  const totalNumPages = Math.ceil(data.length / pageSize);
  const staticPaths: GetStaticPathsResult = [];

  for (let i = 1; i <= totalNumPages; i++) {
    const pageData: CustomPage<T> = {
      data: data.slice((i - 1) * pageSize, i * pageSize),
      currentPage: i,
      lastPage: totalNumPages,
    };
    const pageSlug = i === 1 ? undefined : "page/" + i;

    staticPaths.push({
      params: { page: pageSlug },
      props: {
        page: pageData,
      },
    });
  }

  return staticPaths;
}

export type YearPage<T> = {
  data: T[];
  currentYear: number;
  years: number[];
};

type ThoughtsByYear = Record<number, CollectionEntry<"thoughts">[]>;
export function thoughtPagination(
  data: CollectionEntry<"thoughts">[]
): GetStaticPathsResult {
  const initialThoughtsByYear: ThoughtsByYear = {};
  const thoughtsByYear: ThoughtsByYear = data.reduce((acc, val) => {
    const key = val.data.date.getUTCFullYear();
    if (acc[key]) {
      acc[key] = [...(acc[key] ?? []), val];
    } else {
      acc[key] = [val];
    }
    return acc;
  }, initialThoughtsByYear);

  const sortedPages = getObjectEntries(thoughtsByYear).sort(
    ([a], [b]) => b - a
  );
  const years = sortedPages.map(([year]) => year);

  return sortedPages.map(([year, collection], i) => {
    const pageData: YearPage<CollectionEntry<"thoughts">> = {
      data: collection,
      currentYear: year,
      years,
    };
    const pageSlug = i === 0 ? undefined : "page/" + year;

    return {
      params: { page: pageSlug },
      props: { page: pageData },
    };
  });
}
