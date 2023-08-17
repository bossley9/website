import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { rehypeAutolinkHeadingsOverride } from "./plugins/rehypeAutolinkHeadingsOverride";
import react from "@astrojs/react";

export default defineConfig({
  outDir: "./dist",
  publicDir: "./static",
  site: "https://sam.bossley.xyz", // required for canonical url injection
  integrations: [react()],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds, // explicitly redeclare heading id plugin before overrides
      rehypeAutolinkHeadingsOverride,
    ],
    shikiConfig: {
      theme: "css-variables",
    },
    smartypants: false,
  },
  redirects: {
    "/resume": "/sam-bossley.pdf",
  },
});
