import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  BASE_URL,
  COPYRIGHT,
  AUTHOR,
  EMAIL,
} from '@/constants'
import { getThoughtSlug } from '@/utils/content'
import { sortByDate } from '@/utils/sorting'
import { genAtomFeed, type AtomFeed } from '@/utils/atom'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

export async function get() {
  const recentThoughts = (await getCollection('thoughts'))
    .sort((a, b) => sortByDate(a.data.date, b.data.date))
    .slice(0, 25)

  const items: AtomFeed['items'] = recentThoughts.map(({ data, body }) => {
    const { title, date } = data
    return {
      title,
      permalink: BASE_URL + getThoughtSlug({ title, date }).url,
      date,
      content: parser.render(body),
    }
  })

  const feed: AtomFeed = {
    title: SITE_TITLE,
    subtitle: SITE_DESCRIPTION,
    feedUrl: BASE_URL + '/feed.xml',
    siteUrl: BASE_URL + '/',
    copyright: COPYRIGHT,
    name: AUTHOR,
    email: EMAIL,
    items,
  }
  return { body: genAtomFeed(feed) }
}
