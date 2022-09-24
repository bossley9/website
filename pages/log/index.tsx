import React, { FC, Fragment } from 'react'
import { Head } from 'components/Head'
import { BLink, Link } from 'components/Link'
import { Header } from 'components/Header'
import { getLogs } from 'util/logs'
import { genFeed } from 'util/feeds'
import { formatDate } from 'util/date'
import { Log } from 'util/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import 'constants/iconLibrary'
import { Icon } from 'components/Icon'
import { APP_NAME, RSS_ICON_SIZE } from 'constants/strings'

type Props = StaticProps & {}

const meta = {
  desc:
    'A stream of my raw unconsciousness through written words, poetry, and storytelling',
  href: '/log',
  title: `Emotional Log - ${APP_NAME}`,
}

const LogContainer: FC<Props> = ({ feedUrl, logs }) => {
  return (
    <Fragment>
      <Head meta={{ ...meta, keywords: ['emotional', 'thoughts', 'log'] }} />
      <Header />
      <section className="container tc mb7">
        <h3 className="mb8">Emotional Log.</h3>
        <ul className="lstn mxa mb5 pl0 tl w-70-ns">
          {logs
            .sort((a: Log, b: Log) => a.title.localeCompare(b.title))
            .map(({ id, date, title }: Log) => {
              return (
                <li key={id} className="mb3">
                  <Link
                    href={`${meta.href}/[id]`}
                    as={`${meta.href}/${id}`}
                    className="db tl mb1"
                  >
                    <h5 className="ma0">{title}</h5>
                  </Link>
                  <span className="db mb1 fw700 c-text-light">
                    {formatDate(date)}
                  </span>
                </li>
              )
            })}
        </ul>
        <BLink className="mb5" />
        <div>
          <a aria-label="rss feed" href={feedUrl} className="c-inh">
            <Icon
              icon="rss"
              style={{ width: RSS_ICON_SIZE, height: RSS_ICON_SIZE }}
            />
          </a>
        </div>
      </section>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const logs = getLogs()
  const feedUrl = genFeed({
    ...meta,
    items: logs.map(({ desc, date, id, title }: Log) => ({
      date,
      desc,
      href: `${meta.href}/${id}`,
      id,
      title,
    })),
  })
  return { props: { feedUrl, logs } }
}

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>

export default LogContainer
