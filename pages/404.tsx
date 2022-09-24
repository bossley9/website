import React, { FC, Fragment } from 'react'
import { BLink } from 'components/Link'
import { Header } from 'components/Header'
import 'constants/iconLibrary'

const Main: FC = () => {
  return (
    <Fragment>
      <Header />
      <section className="container my5 mt9 tc">
        <h3>404</h3>
        <span>The page you're looking for doesn't seem to exist.</span>
        <br />
        <BLink className="mt3" />
      </section>
    </Fragment>
  )
}

export default Main
