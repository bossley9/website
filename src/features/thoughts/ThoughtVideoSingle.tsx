import { slugify } from '@/utils/urls'
import type { PageProps } from '@/features/thoughts/ThoughtSingle'

function getMimeType(fileName: string) {
  if (fileName.endsWith('.webm')) {
    return 'video/webm'
  } else {
    return 'video/mp4'
  }
}

type Props = PageProps & { hasDescription: boolean }
export function ThoughtVideoSingle({
  thought,
  hasDescription,
  children,
}: Props) {
  const { title, date, tags, video, thumbnail, captions, description } =
    thought.data

  // sanity check: only valid videos can render this layout
  if (!video) return null

  return (
    <article className="thoughtvideo">
      <video controls poster={thumbnail} preload="metadata">
        <source src={video} type={getMimeType(video)} />
        {captions && (
          <track
            default
            kind="captions"
            label="English"
            srcLang="en"
            src={captions}
          />
        )}
        <p className="error">
          Sorry, your browser does not support embedded video.{' '}
          <a href={video} download>
            Download it here
          </a>
          .
        </p>
      </video>
      <h1 className="h2">{title}</h1>
      <div className="metadata">
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
        <ul className="taglist">
          {tags.map((tag) => (
            <li key={tag}>
              <a href={`/tags/${slugify(tag)}`}>#{tag}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="desc">
        {hasDescription ? children : <p>{description}</p>}
      </div>
    </article>
  )
}
