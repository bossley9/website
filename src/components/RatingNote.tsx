type Props = {
  rating: number
  note: string | undefined
}

export function RatingNote({ rating, note }: Props) {
  return (
    <span>
      {rating >= 0 &&
        `${rating.toLocaleString('en-us', {
          minimumFractionDigits: 1,
        })}/10.`}
      {note && (
        <>
          &nbsp;<i>{note}</i>
        </>
      )}
    </span>
  )
}
