type Props = {
  title: string
  date: Date
  url: string
  isVideo?: boolean
}

export function ArticleListItem({ title, date, url, isVideo = false }: Props) {
  const formattedTitle = isVideo ? `${title} (video)` : title
  return (
    <li>
      <a href={url}>
        <span>{formattedTitle}</span>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </a>
    </li>
  )
}
