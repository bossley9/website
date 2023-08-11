import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { RehypePlugin } from "@astrojs/markdown-remark";

export const rehypeAutolinkHeadingsOverride: [RehypePlugin, unknown] = [
  rehypeAutolinkHeadings,
  {
    behavior: "append",
    properties: { class: "anchor" },
    content: () => [{ type: "text", value: "¶" }],
    test: ["h2", "h3", "h4", "h5", "h6"],
  },
];
