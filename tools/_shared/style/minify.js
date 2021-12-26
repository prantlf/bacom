import postcss from 'postcss'
import cssnano from 'cssnano'
import CleanCSS from 'clean-css'
import csso from 'csso'
import esbuild from 'esbuild'
import { SourceMapConsumer, SourceMapGenerator } from 'source-map'

async function minifyCssNano(from, content) {
  let { css, map } = await postcss([cssnano({ preset: 'default' })])
    .process(content, { from, map: { inline: false, annotation: true, sourcesContent: true } })
  let eol = css.lastIndexOf('\n')
  if (css.charAt(eol - 1) === '\r') --eol
  return { css: css.substring(0, eol), map }
}

async function minifyCleanCss(from, content) {
  const { styles, sourceMap } = await new CleanCSS({ sourceMap: true, sourceMapInlineSources: true })
    .minify({ [from]: { styles: content } });
//   styles = `${styles}
// /*# sourceMappingURL=${to}.map */`
  return { css: styles, map: sourceMap }
}

async function minifyCsso(from, content) {
  const { css, map } = csso.minify(content, { filename: from, sourceMap: true });
//   css = `${css}
// /*# sourceMappingURL=${to}.map */`
  return { css, map }
}

async function minifyEsbuild(from, content) {
  // const input = await readFile(`${name}.css`, 'utf8')
  const { code: css, map } = await esbuild.transform(content,
    { loader: 'css', minify: true, sourcemap: true });
  const parsedMap = JSON.parse(map)
  parsedMap.sources = [from]
  let sourceMap
  await SourceMapConsumer.with(parsedMap, null,
    consumer => sourceMap = SourceMapGenerator.fromSourceMap(consumer))
  // await writeFile(`${name}.min.css`, t.outputFiles[0].contents)
  return { css, map: sourceMap }
}

export default async function minifyCss(from, content) {
  const [nano, clean, csso, esbuild] = await Promise.all([
    minifyCssNano(from, content), minifyCleanCss(from, content),
    minifyCsso(from, content), minifyEsbuild(from, content)
  ])
  // console.log('nano', nano.css.length, nano.map.toString().length)
  // console.log('clean', clean.css.length, clean.map.toString().length)
  // console.log('csso', csso.css.length, csso.map.toString().length)
  // console.log('esbuild', esbuild.css.length, esbuild.map.toString().length)
  let result = nano
  if (clean.css.length < result.css.length) result = clean
  if (csso.css.length < result.css.length) result = csso
  if (esbuild.css.length < result.css.length) result = esbuild
  return result
}
