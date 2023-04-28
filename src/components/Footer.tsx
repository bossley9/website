import { COPYRIGHT } from '@/constants'

export function Footer() {
  return (
    <footer>
      <p className="donotprint">
        <a aria-label="rss feed" href="/feed.xml">
          <svg
            width="16"
            height="16"
            viewBox="0 0 448 448"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <circle cx="64" cy="384" r="64"></circle>
              </g>
            </g>
            <g>
              <g>
                <path d="M0,149.344v85.344c117.632,0,213.344,95.68,213.344,213.312h85.312C298.656,283.328,164.672,149.344,0,149.344z"></path>
              </g>
            </g>
            <g>
              <g>
                <path d="M0,0v85.344C200,85.344,362.688,248,362.688,448H448C448,200.96,247.04,0,0,0z"></path>
              </g>
            </g>
          </svg>
        </a>
        &nbsp;&nbsp;
        <a href="https://aboutfeeds.com">What is a feed?</a>
      </p>
      <p className="donotprint">
        <a href="/referrals">Referrals</a>
      </p>
      <p className="donotprint">
        This site will never contain tracking, ads, or require javascript
        (unless a page specifically demonstrates javascript capabilities).
      </p>
      <p>
        <a href="/">{COPYRIGHT}</a>
        &nbsp;
        <a href="https://creativecommons.org/licenses/by-nc/4.0/">
          CC BY-NC 4.0
        </a>
      </p>
    </footer>
  )
}
