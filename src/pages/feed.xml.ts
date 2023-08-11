import {
  AUTHOR,
  BASE_URL,
  COPYRIGHT,
  EMAIL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/constants";
import { getThoughtSlug } from "@/utils/content";
import { sortByDate } from "@/utils/sorting";
import { type AtomFeed, genAtomFeed } from "@/utils/atom";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export async function get() {
  const recentThoughts = (await getCollection("thoughts"))
    .sort((a, b) => sortByDate(a.data.date, b.data.date))
    .slice(0, 25);

  const items: AtomFeed["items"] = recentThoughts.map(({ data, body }) => {
    const { title, date, video, description } = data;
    const permalink = BASE_URL + getThoughtSlug({ title, date }).url;

    if (video) {
      return {
        title: `${title} (video)`,
        permalink,
        date,
        content: `<p>${description}</p>`,
      };
    }

    return {
      title,
      permalink,
      date,
      content: parser.render(body),
    };
  });

  const feed: AtomFeed = {
    title: SITE_TITLE,
    subtitle: SITE_DESCRIPTION,
    feedUrl: BASE_URL + "/feed.xml",
    siteUrl: BASE_URL + "/",
    copyright: COPYRIGHT,
    name: AUTHOR,
    email: EMAIL,
    items,
  };
  return { body: genAtomFeed(feed) };
}
