const { SourceMapConsumer } = require('source-map')
// const { writeFile } = require('fs/promises')
const { basename } = require('path')
const minifyCss = require('./minify')
const mapifyMemo = require('../_shared/mapify')
const escapeTaggedTemplate = require('../_shared/escape')

async function compileMinified(path, source, module) {
  const name = basename(path)
  const { css, map } = await minifyCss(`${name}.min`, source)
  const mini = map.toJSON()
  mini.sources = [name]
  mini.file = `${name}.min`
  // await writeFile(`${path}.min`, css)
  // await writeFile(`${path}.1.map`, JSON.stringify(mini))
  const code = `import { style } from '${module}'
export default style(\`${escapeTaggedTemplate(css)}\`)`
  const script = mapifyMemo(`${name}.min`, `${name}.js`, code)
  // script.setSourceContent(`${name}.min`, css)
  // await writeFile(`${path}.js`, code)
  // await writeFile(`${path}.2.map`, script.toString())
  await SourceMapConsumer.with(mini, null, mini => script.applySourceMap(mini))
  // await writeFile(`${path}.3.map`, map2.toString())
  return { code, map: script }
}

function compileMapified(path, source, module) {
  const name = basename(path)
  const code = `import { style } from '${module}'
export default style(\`${escapeTaggedTemplate(source)}\`)`
  const map = mapifyMemo(name, `${name}.js`, source)
  // await writeFile(`${path}.js`, code)
  // await writeFile(`${path}.map`, map.toString())
  return { code, map }
}

module.exports = function compileCss(path, source, minify, module) {
  return minify ? compileMinified(path, source, module) :
    compileMapified(path, source, module)
}
