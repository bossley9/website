type Props = {
  title: string
  date: Date
  url: string
}

export function ArticleListItem({ title, date, url }: Props) {
  return (
    <li>
      <a href={url}>
        <span>{title}</span>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </a>
    </li>
  )
}
