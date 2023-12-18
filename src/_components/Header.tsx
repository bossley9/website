import { SITE_TITLE } from "@/_utils/constants";

type Props = { currentUrl: URL };

export function Header({ currentUrl }: Props) {
  const getClasses = (path: string): string => {
    return currentUrl.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <header className="dnp">
      <nav>
        <a className="title" href="/">
          {SITE_TITLE}
        </a>
        <a className={getClasses("/thoughts")} href="/thoughts">
          thoughts
        </a>
        <a href="https://github.com/bossley9">repos</a>
        <a className={getClasses("/tabs")} href="/tabs">
          tabs
        </a>
        <a className={getClasses("/poems")} href="/poems">
          poems
        </a>
        <a className={getClasses("/recipes")} href="/recipes">
          recipes
        </a>
        <a className={getClasses("/recs")} href="/recs">
          recs
        </a>
      </nav>
    </header>
  );
}
