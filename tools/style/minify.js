const postcss = require('postcss')
const cssnano = require('cssnano')
const CleanCSS = require('clean-css')
const csso = require('csso')
// const esbuild = require('esbuild')

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

// async function minifyEsbuild(name) {
//   const input = await readFile(`${name}.css`, 'utf8')
//   const { code } = await esbuild.transform(input, { loader: 'css', minify: true });
//   // const t = await esbuild.build({ entryPoints: [`${name}.css`], outfile: `${name}.min.css`, bundle: true, minify: true, sourcemap: true });
//   await writeFile(`${name}.min.css`, t.outputFiles[0].contents)
// }

module.exports = async function minifyCss(from, content) {
  const [nano, clean, csso] = await Promise.all([
    minifyCssNano(from, content), minifyCleanCss(from, content), minifyCsso(from, content)
  ])
  return nano.css.length < clean.css.length ?
    nano.css.length < csso.css.length ? nano : csso :
    clean.css.length < csso.css.length ? clean : csso
}
