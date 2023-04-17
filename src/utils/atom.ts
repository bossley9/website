import dompurify from 'isomorphic-dompurify'
import { escape } from 'html-escaper'

export type AtomFeed = {
  title: string
  subtitle: string
  feedUrl: string
  siteUrl: string
  copyright?: string
  name: string
  email: string
  items: {
    title: string
    permalink: string
    date: Date
    content: string // valid HTML string
  }[]
}

export function genAtomFeed(feed: AtomFeed) {
  const now = new Date()
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `<title>${feed.title}</title>`,
    `<subtitle>${feed.subtitle}</subtitle>`,
    `<link href="${feed.feedUrl}" rel="self"/>`,
    `<link href="${feed.siteUrl}"/>`,
    `<updated>${now.toISOString()}</updated>`,
    `<id>${feed.siteUrl}</id>`,
    ...(feed.copyright ? [`<rights>${feed.copyright}</rights>`] : []),
    '<author>',
    `<name>${feed.name}</name>`,
    `<email>${feed.email}</email>`,
    '</author>',
    ...feed.items
      .map((item) => {
        return [
          '<entry>',
          `<title>${item.title}</title>`,
          `<link href="${item.permalink}"/>`,
          `<updated>${item.date.toISOString()}</updated>`,
          `<id>${item.permalink}</id>`,
          '<content type="html">',
          escape(dompurify.sanitize(item.content)),
          '</content>',
          '</entry>',
        ]
      })
      .flat(),
    '</feed>',
  ].join('')
}
