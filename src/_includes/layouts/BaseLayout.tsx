import { Header } from "@/_components/Header.tsx";
import { Footer } from "@/_components/Footer.tsx";
import {
  AUTHOR,
  BASE_URL,
  MAIN_STYLE_BASE_URL,
  MAIN_STYLE_HASH,
  SITE_DESCRIPTION,
  SITE_TAGS,
  SITE_TITLE,
} from "@/_utils/constants.ts";
import type { LayoutProps } from "@/_types/lume.ts";

type Props = LayoutProps & {
  minimal?: boolean;
};

export default function (
  {
    url = "",
    title,
    description = SITE_DESCRIPTION,
    tags: startTags,
    image,
    minimal = false,
    content,
  }: Props,
): JSX.Element {
  const tags = Array.isArray(startTags) && startTags.length > 0
    ? startTags
    : SITE_TAGS;
  return (
    <>
      {/* doctype isn't valid JSX so it needs to be inserted as a string */}
      {"<!doctype html>"}
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="manifest" href="/manifest.json" />

          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Inter/Regular.woff2"
            crossorigin
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Inter/Bold.woff2"
            crossorigin
          />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="msapplication-starturl" content="/index.html" />

          <meta name="theme-color" content="#fbfbf8" />

          {minimal
            ? <title>{title || SITE_TITLE}</title>
            : <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>}
          <meta name="og:title" content={title || SITE_TITLE} />
          <meta name="twitter:title" content={title || SITE_TITLE} />

          <link rel="apple-touch-startup-image" href="/favicon/favicon.png" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/favicon/favicon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/favicon.png"
          />
          <link
            rel="shortcut icon"
            sizes="192x192"
            href="/favicon/favicon.png"
          />

          <meta property="og:site_name" content={SITE_TITLE} />
          <meta name="twitter:site" content={SITE_TITLE} />
          <meta name="application-name" content={SITE_TITLE} />
          <meta name="apple-mobile-web-app-title" content={SITE_TITLE} />

          <meta name="author" content={AUTHOR} />
          <meta name="twitter:creator" content={AUTHOR} />

          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta name="twitter:description" content={description} />

          <meta name="keywords" content={tags.join(",")} />

          {image &&
            (
              <>
                <meta name="og:image" content={image} />
                <meta name="twitter:image" content={image} />
              </>
            )}

          <meta name="og:url" content={new URL(url, BASE_URL).toString()} />
          <link rel="canonical" href={new URL(url, BASE_URL).toString()} />

          <meta name="twitter:card" content="summary" />
          <meta name="og:type" content="website" />

          <link
            rel="alternate"
            type="application/rss+xml"
            href={new URL("/feed.xml", BASE_URL).toString()}
            title={SITE_TITLE}
          />

          <link
            rel="stylesheet"
            href={`${MAIN_STYLE_BASE_URL}/${MAIN_STYLE_HASH}.min.css`}
          />
        </head>
        <body>
          {!minimal && <Header currentUrl={new URL(url, BASE_URL)} />}
          <main>
            {content}
          </main>
          <Footer minimal={minimal} />
        </body>
      </html>
    </>
  );
}
