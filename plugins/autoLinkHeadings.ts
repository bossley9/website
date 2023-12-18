import { slugify } from "../src/_utils/urls.ts";
export function lumeAutoLinkHeadingsPlugin() {
  return (site: Lume.Site) => {
    site.process([".html"], (pages) => {
      for (const page of pages) {
        processPage(page);
      }
    });
  };
}

const HEADING_ELEMENTS = [
  // do not apply anchors to h1s
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

function processPage(page: Lume.Page) {
  for (const headingTag of HEADING_ELEMENTS) {
    page.document?.querySelectorAll(headingTag)?.forEach((headingEl) => {
      const headingID = slugify(headingEl.textContent || "");
      headingEl.setAttribute("id", headingID);

      const anchorEl = page.document?.createElement("a");
      if (anchorEl) {
        anchorEl.innerHTML = "¶";
        anchorEl.setAttribute("href", "#" + headingID);
        anchorEl.setAttribute("class", "anchor");
        headingEl.appendChild(anchorEl);
      }
    });
  }
}
