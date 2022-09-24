import React, { FC, Fragment } from 'react'
import NextHead from 'next/head'
import { APP_NAME, APP_BASE_URL } from 'constants/strings'

type Props = {
  meta: {
    author?: string
    desc: string
    href?: string
    image?: string
    keywords?: string[]
    title: string
    type?: string
  }
}

export const Head: FC<Props> = ({ meta }) => {
  const {
    author = APP_NAME,
    desc,
    href = '/',
    image,
    keywords,
    title,
    type: mediaType = 'website',
  } = meta

  const url = `${APP_BASE_URL}${href}`
  const imageUrl = `${APP_BASE_URL}${image}`
  const favicon = '/favicon.ico'

  return (
    <NextHead>
      <meta charSet="utf-8" key="charset" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />

      <title key="title">{title}</title>
      <meta name="og:title" content={title} key="og:title" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta property="og:site_name" content={APP_NAME} key="og:site_name" />
      <meta name="twitter:site" content={APP_NAME} key="twitter:site" />
      {author && (
        <Fragment>
          <meta name="author" content={author} key="author" />
          <meta name="twitter:creator" content={author} key="twitter:creator" />
        </Fragment>
      )}

      <meta name="description" content={desc} key="description" />
      <meta name="og:description" content={desc} key="og:description" />
      <meta
        name="twitter:description"
        content={desc}
        key="twitter:description"
      />

      <meta name="twitter:card" content="summary" key="summary" />

      {image && (
        <Fragment>
          <meta name="og:image" content={imageUrl} key="og:image" />
          <meta name="twitter:image" content={imageUrl} key="twitter:image" />
        </Fragment>
      )}

      {keywords && (
        <meta name="keywords" content={keywords.join(',')} key="keywords" />
      )}

      <meta name="og:type" content={mediaType} key="og:type" />
      <meta name="og:url" content={url} key="og:url" />
      <link rel="canonical" href={url} />

      <link rel="apple-touch-icon" href={favicon} key="apple-touch-icon" />
      <link rel="icon" type="image/png" href={favicon} key="icon" />
      <link rel="shortcut icon" href={favicon} key="shortcut-icon" />
    </NextHead>
  )
}
