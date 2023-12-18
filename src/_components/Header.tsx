import React from "react";
import { SITE_TITLE } from "@/_utils/constants.ts";

type Props = { currentUrl: URL };

export function Header({ currentUrl }: Props) {
  const getClasses = (path: string): string => {
    return currentUrl.pathname.startsWith(path) ? "active" : "";
  };

  return (
    <header class="dnp">
      <nav>
        <a class="title" href="/">
          {SITE_TITLE}
        </a>
        <a class={getClasses("/thoughts")} href="/thoughts">
          thoughts
        </a>
        <a href="https://github.com/bossley9">repos</a>
        <a class={getClasses("/tabs")} href="/tabs">
          tabs
        </a>
        <a class={getClasses("/poems")} href="/poems">
          poems
        </a>
        <a class={getClasses("/recipes")} href="/recipes">
          recipes
        </a>
        <a class={getClasses("/recs")} href="/recs">
          recs
        </a>
      </nav>
    </header>
  );
}
