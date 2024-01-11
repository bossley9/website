const yearlyPlaylists = [
  {
    year: 2024,
    url: "https://open.spotify.com/playlist/0XxK18EiuTTjtNScnmuRAk",
  },
  {
    year: 2023,
    url: "https://open.spotify.com/playlist/62WEGO9DZ4cxxtqjcgg3DK",
  },
  {
    year: 2022,
    url: "https://open.spotify.com/playlist/5zSRhp2N2Reo179NBXRMXL",
  },
  {
    year: 2021,
    url: "https://open.spotify.com/playlist/0UmbFEGA1jMOuir2GHuOCA",
  },
  {
    year: 2020,
    url: "https://open.spotify.com/playlist/5SYSxEDM3bVUzZErDPNlc7",
  },
  {
    year: 2019,
    url: "https://open.spotify.com/playlist/2aeS0ISkmYi9DLbM5RN4nG",
  },
  {
    year: 2018,
    url: "https://open.spotify.com/playlist/3rcvQO2w9dBaXAtav0M8ml",
  },
  {
    year: 2017,
    url: "https://open.spotify.com/playlist/1Vzh4oAgZeVycvbohzvZ1W",
  },
  {
    year: 2016,
    url: "https://open.spotify.com/playlist/7h1BrxiF7EmCXfCxNpb4yV",
  },
  {
    year: 2015,
    url: "https://open.spotify.com/playlist/1GOZNLSGxtTslIsvWeHEtV",
  },
];

export default function () {
  return (
    <section class="music">
      <h1>Music</h1>
      <p>
        I currently use <a href="https://spotify.com/">Spotify</a>{" "}
        to help me curate my wide range of music tastes into digestible
        playlists.
      </p>
      <p>
        Each year, I create a new playlist for the songs I enjoyed listening to
        that year. Here are those playlists if you'd like to listen to them or
        follow along:
      </p>
      <ol>
        {yearlyPlaylists
          .sort((a, b) => b.year - a.year)
          .map(({ year, url }) => (
            <li>
              <a href={url}>
                {year}
              </a>
            </li>
          ))}
      </ol>
    </section>
  );
}
