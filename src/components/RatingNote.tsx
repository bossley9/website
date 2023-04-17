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
      {rating >= 0 && note && <>&nbsp;</>}
      {note && (
        <>
          <i>{note}</i>
        </>
      )}
    </span>
  )
}
