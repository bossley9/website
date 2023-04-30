import { slugify } from '@/utils/urls'
import type { PageProps } from '@/features/thoughts/ThoughtSingle'

export function ThoughtVideoSingle({ thought }: PageProps) {
  const { title, date, tags, video, thumbnail, captions, description } =
    thought.data

  // sanity check: only valid videos can render this layout
  if (!video) return null

  return (
    <article className="thoughtvideo">
      <video controls poster={thumbnail} preload="metadata">
        <source src={video} type="video/mp4" />
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
      <h1>{title}</h1>
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
      <p>{description}</p>
    </article>
  )
}
