const { readFile } = require('fs/promises')
const { process } = require('htmlnano')
const { minify } = require('html-minifier')

const tests = {
  htmlnano: minifyHtmlNano,
  'html-minifier': minifyHtmlMinifier
}
let content

async function measure(func) {
  const start = performance.now()
  const html = await func()
  const time = performance.now() - start
  return { html, time }
}

async function minifyHtmlNano() {
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

function minifyHtmlMinifier() {
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

async function minifyHtml() {
  content = await readFile(`${__dirname}/_shared/bulma.html`, 'utf8')
  const results = await Promise.all(Object.values(tests).map(measure))
  const names = Object.keys(tests)
  console.log('| minifier      | output html size | run time [ms] |')
  console.log('| ------------- | ----------------:| -------------:|')
  for (let i = 0; i < results.length; ++i) {
    const { html, time } = results[i]
    console.log('|', names[i].padStart(13), '|',
      html.length.toString().padStart(16), '|',
      time.toFixed(3).toString().padStart(13), '|')
  }
}

minifyHtml().catch(error => {
  console.error(error)
  process.exitCode = 1
})
