import { EMAIL } from '@/constants'

export function About() {
  return (
    <section id="meta">
      <h1>Hello, I&#39;m Sam (he/him/his)!</h1>
      <p>
        I&#39;m a 20-something year old software engineer living in California.
      </p>
      <p>
        In my freetime I enjoy writing, reading, music, memes, creating art, and
        playing video games.
      </p>
      <p>
        I&#39;m a minimalist by nature and love everything tech, security, and
        libre.
      </p>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </section>
  )
}
