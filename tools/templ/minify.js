import { process } from 'htmlnano'
import { minify } from 'html-minifier'

async function minifyHtmlNano(content) {
  const { html } = await process(content, {
    collapseAttributeWhitespace: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: 'aggressive',
    deduplicateAttributeValues: true,
    minifySvg: true,
    removeAttributeQuotes: true,
    removeComments: 'all',
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortAttributesWithLists: true
  })
  return html
}

function minifyHtmlMinifier(content) {
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

export default async function minifyCss(content) {
  const [nano, html] = await Promise.all([
    minifyHtmlNano(content), minifyHtmlMinifier(content)
  ])
  return nano.length < html.length ? nano : html
}
