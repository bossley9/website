type Props = { years: number[] };

export function MemeSection({ years }: Props) {
  return (
    <section>
      <h1>Memes</h1>
      <p>
        This is a collection of all my meme playlists. I could save all of these
        videos in various Youtube playlists but I prefer to keep them in the{" "}
        <code className="inline-code">.m3u</code> file format if videos are
        deleted or made private.
      </p>
      <ol className="thoughtlist">
        {years
          .sort((a, b) => b - a)
          .map((year) => {
            return (
              <li key={year}>
                <a href={"/memes/" + year}>
                  <span>
                    <strong>{year}</strong>
                  </span>
                </a>
              </li>
            );
          })}
      </ol>
    </section>
  );
}
