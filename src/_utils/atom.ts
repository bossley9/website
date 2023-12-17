import { escape } from "@deps";

export type AtomFeed = {
  title: string;
  subtitle: string;
  feedUrl: string;
  siteUrl: string;
  copyright?: string;
  name: string;
  email: string;
  items: {
    title: string;
    permalink: string;
    date: Date;
    content: string; // valid HTML string
  }[];
};

export function genAtomFeed(feed: AtomFeed) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `<title>${feed.title}</title>`,
    `<subtitle>${feed.subtitle}</subtitle>`,
    `<link href="${feed.feedUrl}" rel="self"/>`,
    `<link href="${feed.siteUrl}"/>`,
    `<updated>${new Date().toISOString()}</updated>`,
    `<id>${feed.siteUrl}</id>`,
    ...(feed.copyright ? [`<rights>${feed.copyright}</rights>`] : []),
    "<author>",
    `<name>${feed.name}</name>`,
    `<email>${feed.email}</email>`,
    "</author>",
    ...feed.items
      .map((item) => {
        const escapedContent = escape(item.content);
        return [
          "<entry>",
          `<title>${item.title}</title>`,
          `<link href="${item.permalink}"/>`,
          `<updated>${item.date.toISOString()}</updated>`,
          `<id>${item.permalink}</id>`,
          '<content type="html">',
          escapedContent,
          "</content>",
          "</entry>",
        ];
      })
      .flat(),
    "</feed>",
  ].join("");
}
