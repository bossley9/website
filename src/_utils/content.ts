import { dateSlugify, slugify } from "@/_utils/urls";

type ThoughtSlugProps = { date: Date; title: string };
export function getThoughtSlug({ date, title }: ThoughtSlugProps) {
  const slug = dateSlugify(date, title);
  return {
    slug,
    url: "/thoughts/" + slug + "/",
  };
}

type TabSlugProps = { date: Date; title: string };
export function getTabSlug({ date, title }: TabSlugProps) {
  const year = date.toLocaleDateString("en", { year: "2-digit" });
  const slug = year + "/" + slugify(title);
  return {
    slug,
    url: "/tabs/" + slug + "/",
  };
}

type PoemSlugProps = { date: Date; title: string };
export function getPoemSlug({ date, title }: PoemSlugProps) {
  const year = date.toLocaleDateString("en", { year: "2-digit" });
  const slug = year + "/" + slugify(title);
  return {
    slug,
    url: "/poems/" + slug + "/",
  };
}

type RecipeSlugProps = { date: Date; title: string };
export function getRecipeSlug({ date, title }: RecipeSlugProps) {
  const year = date.toLocaleDateString("en", { year: "2-digit" });
  const slug = year + "/" + slugify(title);
  return {
    slug,
    url: "/recipes/" + slug + "/",
  };
}

type RecPoemSlugProps = { author: string; title: string };
export function getRecPoemSlug({ author, title }: RecPoemSlugProps) {
  const slug = slugify(author) + "-" + slugify(title);
  return {
    slug,
    url: "/rec-poems/" + slug + "/",
  };
}
