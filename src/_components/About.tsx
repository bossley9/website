import gameData from "@/_data/recs/games.json" with { type: "json" };
import { assertGameList } from "@/_utils/assertions.ts";
import type { Game } from "@/_types/data.ts";
import {
  getCurrentlyReadingItem,
  getCurrentlyWatchingItem,
  getReadingItemURL,
  getWatchingItemTitle,
} from "@/_utils/data.ts";

export function About() {
  const readingItem = getCurrentlyReadingItem();
  const watchingItem = getCurrentlyWatchingItem();

  assertGameList(gameData);
  const gameList: Game[] = gameData;
  const game = gameList.find((item) => item.current);

  return (
    <section class="about">
      <h1>Hello, I&#39;m Sam!</h1>
      <div class="stacked">
        <img
          class="me"
          src="/static/me700x700.jpg"
          alt="a portrait of me"
          width={300}
          height={300}
        />
        <div class="details">
          <div>
            <p>
              I&#39;m a 20-something year old frontend software engineer living
              in Columbus.
            </p>
            <p>
              In my freetime I enjoy writing, reading, music, memes, creating
              art, programming, and playing video games.
            </p>
            <p>
              I&#39;m a minimalist by nature and love everything tech, security,
              and libre.
            </p>
            <p>
              To get in touch you can email me at&nbsp;
              <code>sam[at][this domain]</code>
              &nbsp;or find me on the fediverse as&nbsp;
              <a rel="me" href="https://calckey.world/@sam">
                @sam@calckey.world
              </a>
              . I tend to check both semi-frequently so don&#39;t be shy!
            </p>
          </div>
          <div>
            {readingItem && (
              <p>
                <strong>Book club:</strong> I&#39;m currently reading{" "}
                <a href={getReadingItemURL(readingItem)}>
                  <i>{readingItem.title}</i>
                </a>{" "}
                by {readingItem.author}.
              </p>
            )}
            {watchingItem && (
              <p>
                <strong>Watch party:</strong> I&#39;m currently watching{" "}
                {getWatchingItemTitle(
                  watchingItem,
                )}.
              </p>
            )}
            {game && (
              <p>
                <strong>Play along:</strong> I&#39;m currently playing{" "}
                {game.title}.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
