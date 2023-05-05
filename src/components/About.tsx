import { EMAIL } from '@/constants'

export function About() {
  return (
    <section className="about">
      <h1>Hello, I&#39;m Sam (he/him/his)!</h1>
      <div className="stacked">
        <img className="me" src="/static/me.jpg" alt="a portrait of me" />
        <div>
          <p>
            I&#39;m a 20-something year old frontend software engineer living in
            Columbus.
          </p>
          <p>
            In my freetime I enjoy writing, reading, music, memes, creating art,
            programming, and playing video games.
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
      </div>
    </section>
  )
}
