type Props = {
  rating: number;
  note: string | undefined;
};

export function RatingNote({ rating, note }: Props) {
  const formattedRating = rating.toLocaleString("en-us", {
    minimumFractionDigits: 1,
  });
  return (
    <span>
      {rating >= 0 && `${formattedRating}/10.`}
      {rating >= 0 && note && <>&nbsp;</>}
      {note && (
        <>
          <i>{note}</i>
        </>
      )}
    </span>
  );
}
