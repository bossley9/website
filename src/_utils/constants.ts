import manifest from "@/manifest.json" with { type: "json" };

export const SITE_TITLE = manifest.name;
export const SITE_DESCRIPTION = manifest.description;
export const SITE_TAGS = [
  "sam",
  "bossley",
  "sam bossley",
  "tech",
  "commentary",
];
export const COPYRIGHT = `Copyright ${SITE_TITLE} 2012-2024.`;
export const BASE_URL = "https://sam.bossley.xyz";

export const AUTHOR = "Sam Bossley";
export const EMAIL = "sam@bossley.xyz";

export const MAIN_STYLE_BASE_URL = "/styles";
export const MAIN_STYLE_FILE_NAME = "main.scss";
// automated hash calculation for cache busting
export const MAIN_STYLE_HASH = new TextDecoder().decode(
  new Deno.Command("sha256sum", {
    args: [`./src${MAIN_STYLE_BASE_URL}/${MAIN_STYLE_FILE_NAME}`],
  }).outputSync().stdout,
).replace(/[\ \n]/g, "").substring(0, 10);

export enum Layouts {
  BaseLayout = "layouts/BaseLayout.tsx",
  ThoughtSingle = "layouts/ThoughtSingle.tsx",
  TabSingle = "layouts/TabSingle.tsx",
  PoemSingle = "layouts/PoemSingle.tsx",
  RecipeSingle = "layouts/RecipeSingle.tsx",
  RecPoemSingle = "layouts/RecPoemSingle.tsx",
  StreamSingle = "layouts/StreamSingle.tsx",
}
