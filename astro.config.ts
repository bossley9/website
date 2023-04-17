import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import { rehypeAutolinkHeadingsOverride } from './plugins/rehypeAutolinkHeadingsOverride'
import react from '@astrojs/react'
import compress from 'astro-compress'

export default defineConfig({
  outDir: './dist',
  publicDir: './static',
  site: 'https://sam.bossley.us', // required for canonical url injection
  integrations: [
    react(),
    compress({
      css: false,
      html: true,
      img: false,
      js: false,
      svg: false,
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds, // explicitly redeclare heading id plugin before overrides
      rehypeAutolinkHeadingsOverride,
    ],
    shikiConfig: {
      theme: 'css-variables',
    },
    smartypants: false,
  },
})
