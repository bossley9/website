import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import { lumeReactPlugin } from "react";
import codeHighlight from "lume/plugins/code_highlight.ts";
import { lumeAutoLinkHeadingsPlugin } from "./plugins/autoLinkHeadings.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const site = lume({
  dest: "./dist",
  src: "./src",
});

site.use(sass());
site.use(lumeReactPlugin());
site.use(codeHighlight());
site.use(lumeAutoLinkHeadingsPlugin());
site.use(minifyHTML());

site.copy("manifest.json");
site.copy("robots.txt");
site.copy([".jpg", ".png", ".woff"]);

export default site;
