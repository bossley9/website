import { SITE_TITLE } from '@/constants'

export function Header() {
  return (
    <header className="donotprint">
      <nav>
        <a id="title" href="/">
          {SITE_TITLE}
        </a>
        <a href="/thoughts">thoughts</a>
        <a href="https://git.sr.ht/~bossley9">repos</a>
        <a href="/tabs">tabs</a>
        <a href="/poems">poems</a>
        <a href="/recipes">recipes</a>
        <a href="/recs">recs</a>
      </nav>
    </header>
  )
}