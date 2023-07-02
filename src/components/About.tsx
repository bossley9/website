import { EMAIL } from '@/constants'
import bookData from '@/data/recs/books.json'
import gameData from '@/data/recs/games.json'
import {
  bookListSchema,
  type BookList,
  gameListSchema,
  type GameList,
} from '@/utils/data'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export function About() {
  let bookList: BookList = []
  try {
    bookList = bookListSchema.parse(bookData)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }
  const book = bookList.find((item) => item.current)

  let gameList: GameList = []
  try {
    gameList = gameListSchema.parse(gameData)
  } catch (e) {
    if (e instanceof ZodError) {
      throw fromZodError(e)
    } else {
      throw e
    }
  }
  const game = gameList.find((item) => item.current)

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
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a rel="me" href="https://mas.to/@bossley9"></a>
            </p>
          </div>
          <div>
            {book && (
              <p>
                <strong>Book club:</strong> I&#39;m currently reading{' '}
                <i>{book.title}</i> by {book.author}.
              </p>
            )}
            {game && (
              <p>
                <strong>Play along:</strong> I&#39;m currently playing{' '}
                {game.title}.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
