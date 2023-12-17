import type { MarkdownInstance } from "@deps";
import { sortByDate } from "@/_utils/sorting";
import { getRecipeSlug, getTabSlug, getThoughtSlug } from "@/_utils/content";

export function extractTagsFromContents(
  allContent: MarkdownInstance<Record<string, unknown>>[],
): string[] {
  return [
    ...new Set(allContent.map((content) => content.frontmatter.tags).flat()),
  ]
    .filter((tag): tag is string => Boolean(tag))
    .sort();
}

type ResolvedFrontmatter = {
  tags: string[];
  title: string;
  date: Date | string;
};

export type TagMeta = {
  title: string;
  date: Date;
  url: string;
};

export function groupContentsByTag(
  allContent: MarkdownInstance<Record<string, unknown>>[],
): Record<string, TagMeta[]> {
  return allContent
    .filter((content): content is MarkdownInstance<ResolvedFrontmatter> => {
      const validTags =
        "tags" in content.frontmatter &&
        Array.isArray(content.frontmatter.tags) &&
        content.frontmatter.tags.length > 0;
      const validTitle =
        "title" in content.frontmatter &&
        typeof content.frontmatter.title === "string" &&
        content.frontmatter.title.length > 0;
      const validDate =
        "date" in content.frontmatter &&
        (typeof content.frontmatter.date === "object" ||
          typeof content.frontmatter.date === "string") &&
        !!content.frontmatter.date;
      return validTags && validTitle && validDate;
    })
    .sort((a, b) =>
      sortByDate(new Date(a.frontmatter.date), new Date(b.frontmatter.date)),
    )
    .reduce<Record<string, TagMeta[]>>((dict, content) => {
      for (const key of content.frontmatter.tags) {
        if (!dict[key]) {
          dict[key] = [];
        }

        const title = content.frontmatter.title;
        const date = new Date(content.frontmatter.date);

        // NOTE: we need to manually update tag url generation
        // every time a new collection is added
        const path = content.file.replace(/^.*src\/content\//, ""); // greedy match
        let url = "";
        if (path.startsWith("thoughts")) {
          url = getThoughtSlug({ date, title }).url;
        } else if (path.startsWith("tabs")) {
          url = getTabSlug({ date, title }).url;
        } else if (path.startsWith("recipes")) {
          url = getRecipeSlug({ date, title }).url;
        }

        dict[key]?.push({
          title,
          date,
          url,
        });
      }
      return dict;
    }, {});
}
