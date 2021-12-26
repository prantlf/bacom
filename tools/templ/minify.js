import { minify } from 'html-minifier'

export default function minifyHtml(content) {
  return minify(content, {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true
  })
}
