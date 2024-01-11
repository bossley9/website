import { COPYRIGHT } from "@/_utils/constants.ts";

const footerLinks: { href: string; name: string }[] = [
  {
    href: "https://github.com/bossley9/dotfiles",
    name: "Dotfiles",
  },
  {
    href: "/keyboard",
    name: "Keyboard",
  },
  {
    href: "/keys",
    name: "Keys",
  },
  {
    href: "/music",
    name: "Music",
  },
  {
    href: "/referrals",
    name: "Referrals",
  },
  {
    href: "/streams",
    name: "Streams",
  },
];

type Props = { minimal?: boolean };
export function Footer({ minimal = false }: Props) {
  return (
    <footer>
      {!minimal && (
        <>
          <p class="dnp">
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
                    <path d="M0,149.344v85.344c117.632,0,213.344,95.68,213.344,213.312h85.312C298.656,283.328,164.672,149.344,0,149.344z">
                    </path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M0,0v85.344C200,85.344,362.688,248,362.688,448H448C448,200.96,247.04,0,0,0z">
                    </path>
                  </g>
                </g>
              </svg>
            </a>
            &nbsp;&nbsp;
            <a href="/what-is-a-feed">What is a feed?</a>
          </p>
          <ul class="dnp">
            {footerLinks.map(({ href, name }) => (
              <li>
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
          <p class="dnp">
            This site will never contain tracking, ads, or require JavaScript
            (unless a page specifically demonstrates JavaScript capabilities).
          </p>
        </>
      )}
      <p class="copyrights">
        <a href="/">{COPYRIGHT}</a>
        &nbsp;
        <a
          class="dnp"
          href="https://creativecommons.org/licenses/by-nc/4.0/"
        >
          CC BY-NC 4.0.
        </a>
        &nbsp;
        <a class="dnp" href="https://lume.land/">
          Powered by Lume.
        </a>
      </p>
    </footer>
  );
}
