import React, { FC, Fragment } from 'react'
import { Head } from 'components/Head'
import { Header } from 'components/Header'
import { getLogIds, getLog } from 'util/logs'
import { formatDate } from 'util/date'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Link } from 'components/Link'
import Markdown from 'react-markdown'

type Props = StaticProps

const LogContent: FC<Props> = ({ log }) => {
  const { id, title, desc, date, image, content } = log

  const BASE_URL = '/log'

  return (
    <Fragment>
      <Head
        meta={{
          desc,
          href: `${BASE_URL}/${id}`,
          image,
          title: `${title} - Emotional Log.`,
          type: 'article',
        }}
      />
      <Header />
      <article className="container tc mb7">
        <h3 className="my5">{title}</h3>
        <div className="mb5">
          <span className="ff-libre">{formatDate(date)}</span>
        </div>
        <div className="mb5 tl markdown markdown-log">
          <Markdown escapeHtml={false} source={content} />
        </div>
        <Link href={BASE_URL}>Go Back</Link>
      </article>
    </Fragment>
  )
}

export const getStaticPaths = async () => {
  const paths = getLogIds()
  return { paths, fallback: false }
}

type PropParams = { params?: any }

export const getStaticProps: GetStaticProps = async ({
  params,
}: PropParams) => {
  const log = getLog(params.id)
  return { props: { log } }
}

type StaticProps = InferGetStaticPropsType<typeof getStaticProps>

export default LogContent
