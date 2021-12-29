import { SourceMapConsumer } from 'source-map'
import { basename } from 'path'
import minifyCss from './minify'
import mapifyMemo from '../mapify'
import escapeTaggedTemplate from '../escape'

export default async function compileCss(path, source, map, minify, module) {
  const name = basename(path)
  let css, minified
  if (minify) {
    ({ css, map: minified } = await minifyCss(name, source))
    minified = minified.toJSON()
    minified.sources = [name]
    minified.file = `${name}.min`
  } else {
    css = source
  }
  const code = `import { style } from '${module}'
export default style(\`${escapeTaggedTemplate(css)}\`)`
  const scripted = mapifyMemo(name, `${name}.js`, 'style', css)
  if (minified) {
    await SourceMapConsumer.with(minified, null,
      consumer => scripted.applySourceMap(consumer))
  }
  if (map) {
    await SourceMapConsumer.with(map, null,
      consumer => scripted.applySourceMap(consumer))
  }
  return { code, map: scripted }
}
