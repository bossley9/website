import fs from 'fs'
import path from 'path'
import marked from 'marked'
import { Feed } from 'util/types'
import { APP_BASE_URL } from 'constants/strings'

export const genFeed = (meta: Feed) => {
  const { desc, href, image, items = [], title } = meta
  const link = `${APP_BASE_URL}${href}`
  const feedHref = `/feeds${href}.xml`
  const feedUrl = path.join(process.cwd(), `public${feedHref}`)
  const filepath = path.dirname(feedUrl)

  if (!fs.existsSync(filepath)) fs.mkdirSync(filepath, { recursive: true })

  fs.writeFileSync(
    feedUrl,
    `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${title}</title> 
        <link>${link}</link>
        <description>${desc}</description> 
        <language>en-us</language>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <atom:link href="${APP_BASE_URL}${feedHref}" rel="self" type="application/rss+xml" />
        ${
          image
            ? `
        <image>
          <url>${APP_BASE_URL}${image}</url>
          <title>${title}</title>
          <link>${link}</link>
        </image>
              `
            : ''
        }
        ${items
          .map((item) => {
            const { content, date, desc, href, id, tags, title } = item
            const itemLink = `${APP_BASE_URL}${href}`
            const body = content || desc

            return `
        <item>
          <title>${title}</title>
          <link>${itemLink}</link>
          ${
            body
              ? `
          <description><![CDATA[${marked(body)}]]></description>
                `
              : ''
          }
          ${
            date
              ? `
          <pubDate>${new Date(date).toUTCString()}</pubDate>
                `
              : ''
          }
          ${
            id
              ? `
          <guid isPermaLink="false">${id}</guid>
                `
              : ''
          }
          ${
            tags
              ? tags
                  .map(
                    (tag) => `
          <category>${tag}</category>
                            `
                  )
                  .join('')
              : ''
          }
        </item>
                 `
          })
          .join('')}
      </channel>
    </rss>
    `
  )

  return feedHref
}
