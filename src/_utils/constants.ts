import manifest from "@static/manifest.json" with { type: "json" };

export const SITE_TITLE = manifest.name;
export const SITE_DESCRIPTION = manifest.description;
export const SITE_TAGS = [
  "sam",
  "bossley",
  "sam bossley",
  "tech",
  "commentary",
];
export const COPYRIGHT = `Copyright ${SITE_TITLE} 2012-2023.`;
export const BASE_URL = "https://sam.bossley.xyz";

export const AUTHOR = "Sam Bossley";
export const EMAIL = "sam@bossley.xyz";

export enum Layouts {
  BaseLayout = "layouts/BaseLayout.tsx",
  ThoughtSingle = "layouts/ThoughtSingle.tsx",
  TabSingle = "layouts/TabSingle.tsx",
  PoemSingle = "layouts/PoemSingle.tsx",
  RecipeSingle = "layouts/RecipeSingle.tsx",
  RecPoemSingle = "layouts/RecPoemSingle.tsx",
}
