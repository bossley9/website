import { FC, Fragment, ReactNode } from 'react'
import { APP_NAME } from 'constants/strings'
import Head from 'next/head'

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Fragment>
    <Head>
      <title>{APP_NAME}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content="Sam Bossley" />

      <link rel="shortcut icon" href="/favicon.ico" />

      <link
        href="https://fonts.googleapis.com/css?family=Bangers"
        rel="stylesheet"
      />
    </Head>
    {children}
  </Fragment>
)
