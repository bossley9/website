import { Fragment } from "react";
import { COPYRIGHT } from "@/constants";

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
    href: "/referrals",
    name: "Referrals",
  },
];

type Props = { minimal?: boolean };
export function Footer({ minimal = false }: Props) {
  return (
    <footer>
      {!minimal && (
        <>
          <p className="dnp">
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
            <a href="/what-is-a-feed">What is a feed?</a>
          </p>
          <p className="dnp">
            {footerLinks.map(({ href, name }, index) => (
              <Fragment key={href}>
                {Boolean(index) && <span>&nbsp;|&nbsp;</span>}
                <a href={href}>{name}</a>
              </Fragment>
            ))}
          </p>
          <p className="dnp">
            This site will never contain tracking, ads, or require JavaScript
            (unless a page specifically demonstrates JavaScript capabilities).
          </p>
        </>
      )}
      <p>
        <a href="/">{COPYRIGHT}</a>
        &nbsp;
        <a
          className="dnp"
          href="https://creativecommons.org/licenses/by-nc/4.0/"
        >
          CC BY-NC 4.0.
        </a>
        &nbsp;
        <a className="dnp" href="https://astro.build/">
          Powered by Astro.
        </a>
      </p>
    </footer>
  );
}
