import { FC } from 'react'
import { Layout } from 'components/Layout'

const Main: FC = () => {
  return (
    <Layout>
      <div className="bg"></div>
      <h1 className="name">Sam Bossley</h1>
      <p id="tag"></p>
      <ul className="links">
        <li>
          <a
            download
            target="_blank"
            rel="noopener noreferrer"
            href="/Sam_Bossley.pdf"
          >
            Resume
          </a>
        </li>
        <li>
          <a href="mailto:bossley.samuel@gmail.com">Email</a>
        </li>
        <li>
          <a href="https://github.com/bossley9">Github</a>
        </li>
        <li>
          <a href="https://github.com/bossley9/dotfiles">Dotfiles</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/bossley9/">Linkedin</a>
        </li>
      </ul>
    </Layout>
  )
}

export default Main
