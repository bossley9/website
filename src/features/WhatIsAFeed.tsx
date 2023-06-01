type FeedExample = { name: string; url: string }

const feedExamples: FeedExample[] = [
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCX6OQ3DkcsbYNE6H8uQQuVA',
  },
  { name: 'Twitch', url: 'https://twitchrss.appspot.com/vod/moistcr1tikal' },
  { name: 'Twitter', url: 'https://nitter.net/reactjs/rss' },
  { name: 'Medium', url: 'https://medium.com/feed/@emilymenonbender' },
  { name: 'Github', url: 'https://github.com/neovim/neovim/tags.atom' },
  { name: 'Acast', url: 'https://feeds.acast.com/public/shows/90daygays' },
  {
    name: 'Webtoon',
    url: 'https://www.webtoons.com/en/challenge/summoned/rss?title_no=365069+',
  },
]

type Props = { feedUrl: URL }
export function WhatIsAFeed({ feedUrl }: Props) {
  return (
    <>
      <article className="what-is-a-feed">
        <h1 className="h2">What is a feed?</h1>
        <p>
          A <dfn>feed</dfn> is a special website url you can use to get the
          latest updates for that website. With feeds you can get real-time
          updates for Youtube channels, Twitch streams, Acast podcasts, blog
          posts, and website articles from one place. All you need to do is{' '}
          <dfn>subscribe</dfn> to that feed with a <dfn>feed reader</dfn>.
        </p>
        <p>
          <em>Feeds give you control.</em> You won&#39;t see ads, miscellaneous
          spam, or content curated by some mysterious algorithm. You&#39;ll only
          see the content you signed up for. If you no longer want to get
          updates for a feed, you simply <dfn>unsubscribe</dfn> from the feed.
        </p>
        <p>
          Feeds sometimes go by different names across the internet, such as
          &#34;RSS feeds&#34;, &#34;Atom feeds&#34;, or &#34;website feeds&#34;,
          but they all mean the same thing. Feeds are usually represented by
          this icon:
        </p>
        <svg
          aria-label="rss feed symbol"
          width="20"
          height="20"
          viewBox="0 0 448 448"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g>
              <circle cx="64" cy="384" r="64"></circle>
            </g>
          </g>
          <g>
            <g>
              <path d="M0,149.344v85.344c117.632,0,213.344,95.68,213.344,213.312h85.312C298.656,283.328,164.672,149.344,0,149.344z"></path>
            </g>
          </g>
          <g>
            <g>
              <path d="M0,0v85.344C200,85.344,362.688,248,362.688,448H448C448,200.96,247.04,0,0,0z"></path>
            </g>
          </g>
        </svg>
        <p>
          A lot of websites support feeds. Subscribing to one or two feeds
          won&#39;t feel beneficial, but once you&#39;re subscribed to 10, 20,
          or 50 feeds, you&#39;ll begin to see how useful it is to keep all
          these updates in one place.
        </p>

        <h1 className="h2">How do I subscribe to a feed?</h1>
        <p>
          To subscribe to a feed, you&#39;ll need a <dfn>feed reader</dfn>. A
          feed reader (aka &#34;aggregator&#34;, &#34;news reader&#34;, or
          &#34;RSS reader&#34;) keeps track of all your feed urls and organizes
          all your feed updates. Here are a few common feed readers:
        </p>
        <ul>
          <li>
            <a href="https://www.inoreader.com/">
              Inoreader (Web, iOS, Android)
            </a>
          </li>
          <li>
            <a href="https://feeder.co/">Feeder (Web, iOS, Android)</a>
          </li>
          <li>
            <a href="https://feedly.com/">Feedly (Web, iOS, Android)</a>
          </li>
          <li>
            <a href="https://miniflux.app/">Miniflux (Web, iOS, Android)</a>
          </li>
        </ul>
        <p>
          All feed readers work in similar fashions so it doesn&#39;t matter
          which one you choose. Just pick the one you like the look of. You can
          always export and import your feeds later. All you need to do is get a
          feed url and paste it into your feed reader to subscribe!
        </p>
        <h1 className="h2">Where do I find feeds?</h1>
        <p>
          Try peeking around a website&#39;s header or footer to find the feed
          icon. If you can&#39;t find one, most feed readers are smart enough to
          figure out the feed url for you.
        </p>
        <p>If you&#39;re still having trouble, here are a few feed examples:</p>
        <ul>
          {feedExamples.map(({ name, url }) => (
            <li key={url}>
              {name} =&gt; <a href={url}>{url}</a>
            </li>
          ))}
        </ul>
        <p>
          You can also subscribe to my personal feed:{' '}
          <a href={feedUrl.toString()}>{feedUrl.toString()}</a>
        </p>
      </article>
    </>
  )
}
