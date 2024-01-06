import {
  MAIN_STYLE_BASE_URL,
  MAIN_STYLE_FILE_NAME,
  MAIN_STYLE_HASH,
} from "@/_utils/constants.ts";

export function cacheBustCSS() {
  return (site: Lume.Site) => {
    site.process([".css"], function (files: Lume.Page[]) {
      for (const file of files) {
        if (
          file.sourcePath === `${MAIN_STYLE_BASE_URL}/${MAIN_STYLE_FILE_NAME}`
        ) {
          file.data.url = `${MAIN_STYLE_BASE_URL}/${MAIN_STYLE_HASH}.min.css`;
        }
      }
    });
  };
}
