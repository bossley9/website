import gameData from "@/data/recs/games.json";
import { type Game, gameListSchema } from "@/utils/schemas";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { getCurrentlyReadingItem } from "@/utils/data";

export function About() {
  const readingItem = getCurrentlyReadingItem();

  let gameList: Game[] = [];
  try {
    gameList = gameListSchema.parse(gameData);
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e);
    } else {
      throw e;
    }
  }
  const game = gameList.find((item) => item.current);

  return (
    <section className="about">
      <h1>Hello, I&#39;m Sam!</h1>
      <div className="stacked">
        <img
          className="me"
          src="/static/me700x700.webp"
          alt="a portrait of me"
          width={300}
          height={300}
        />
        <div className="details">
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
              You can contact me at&nbsp;
              <span className="social">
                bossley [dot] samuel [at] gmail [dot] com
              </span>
              &nbsp; or find me on the fediverse as&nbsp;
              <a className="social" rel="me" href="https://calckey.world/@sam">
                @sam@calckey.world
              </a>
              . I tend to check both semi-frequently so don&#39;t be shy!
            </p>
          </div>
          <div>
            {readingItem && (
              <p>
                <strong>Book club:</strong> I&#39;m currently reading{" "}
                <i>{readingItem.title}</i> by {readingItem.author}.
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
