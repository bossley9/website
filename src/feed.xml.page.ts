import {
  AUTHOR,
  BASE_URL,
  COPYRIGHT,
  EMAIL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/_utils/constants.ts";
import { type AtomFeed, genAtomFeed } from "@/_utils/atom.ts";
import { markdownIt } from "@deps";
import { assertThoughtPost } from "@/_utils/assertions.ts";

export const layout = "";
export const url = "/feed.xml";

const parser = new markdownIt();

type Props = {
  search: Lume.Data["search"];
};

export default function ({ search }: Props) {
  const recentThoughts = search.pages("thought", "date=desc", 25);

  const items: AtomFeed["items"] = recentThoughts.map((data) => {
    assertThoughtPost(data);
    const { url, title, date, video, description, content } = data;
    const permalink = BASE_URL + url;

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
      content: parser.render(String(content)),
    };
  });

  const feed: AtomFeed = {
    title: SITE_TITLE,
    subtitle: SITE_DESCRIPTION,
    feedUrl: new URL(url, BASE_URL).toString(),
    siteUrl: new URL(BASE_URL).toString(),
    copyright: COPYRIGHT,
    name: AUTHOR,
    email: EMAIL,
    items,
  };
  return genAtomFeed(feed);
}
