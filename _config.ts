import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import { lumeReactPlugin } from "react/jsx-runtime";
import mdx from "lume/plugins/mdx.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import { lumeAutoLinkHeadingsPlugin } from "./plugins/autoLinkHeadings.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

import {
  InlineAudio,
  InlineVideo,
  Timestamp,
} from "@/_components/InlineMedia.tsx";

const site = lume({
  dest: "./dist",
  src: "./src",
});

site.use(sass());
site.use(lumeReactPlugin());
site.use(mdx({
  components: {
    InlineVideo,
    InlineAudio,
    Timestamp,
  },
}));
site.use(codeHighlight());
site.use(lumeAutoLinkHeadingsPlugin());
site.use(minifyHTML());

site.copy("manifest.json");
site.copy("robots.txt");
site.copy("keys.pub", "keys");
site.copy([".jpg", ".png", ".woff"]);

export default site;
