const { readFile } = require('fs/promises')
const postcss = require('postcss')
const cssnano = require('cssnano')
const CleanCSS = require('clean-css')
const { minify } = require('csso')
const { transform } = require('esbuild')
const crass = require('crass')
const { SourceMapConsumer, SourceMapGenerator } = require('source-map')

const tests = {
  despace: minifyDeSpace,
  nano: minifyCssNano,
  clean: minifyCleanCss,
  csso: minifyCsso,
  esbuild: minifyEsbuild,
  crass: minifyCrass
}
const from = 'test.css'
let content

async function measure(func) {
  const start = performance.now()
  const result = await func()
  result.time = performance.now() - start
  return result
}

async function minifyDeSpace() {
  const css = content
    .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
    .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\/\*.*?\*\//g, '');
  return { css, map: '' }
}

async function minifyCssNano() {
  let { css, map } = await postcss([cssnano({ preset: 'default' })])
    .process(content, { from, map: { inline: false, annotation: true, sourcesContent: true } })
  let eol = css.lastIndexOf('\n')
  if (css.charAt(eol - 1) === '\r') --eol
  return { css: css.substring(0, eol), map }
}

async function minifyCleanCss() {
  const { styles, sourceMap } = await new CleanCSS(
    { sourceMap: true, sourceMapInlineSources: true, level: 1 })
    .minify({ [from]: { styles: content } });
  return { css: styles, map: sourceMap }
}

async function minifyCsso() {
  const { css, map } = minify(content, { filename: from, sourceMap: true });
  return { css, map }
}

async function minifyEsbuild() {
  const { code: css, map } = await transform(content,
    { loader: 'css', minify: true, sourcemap: true });
  const parsedMap = JSON.parse(map)
  parsedMap.sources = [from]
  let sourceMap
  await SourceMapConsumer.with(parsedMap, null,
    consumer => sourceMap = SourceMapGenerator.fromSourceMap(consumer))
  return { css, map: sourceMap }
}

async function minifyCrass() {
  const css = crass.parse(content)
    .optimize({ css4: true, o1: false })
    .toString()
  return { css, map: '' }
}

async function minifyCss() {
  content = await readFile(`${__dirname}/_shared/bootstrap.css`, 'utf8')
  const results = await Promise.all(Object.values(tests).map(measure))
  const names = Object.keys(tests)
  console.log('| minifier | output css size | source map size | run time [ms] |')
  console.log('| -------- | ---------------:| ---------------:| -------------:|')
  for (let i = 0; i < results.length; ++i) {
    const { css, map, time } = results[i]
    console.log('|', names[i].padStart(8), '|',
      css.length.toString().padStart(15), '|',
      map.toString().length.toString().padStart(15), '|',
      time.toFixed(3).toString().padStart(13), '|')
  }
}

minifyCss().catch(error => {
  console.error(error)
  process.exitCode = 1
})
