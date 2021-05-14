// const { writeFile } = require('fs/promises')
const { basename } = require('path')
const minifyHtml = require('./minify')
const mapifyMemo = require('../_shared/mapify')
const escapeTaggedTemplate = require('../_shared/escape')

async function compileMinified(path, source, module) {
  const name = basename(path)
  const html = await minifyHtml(source)
  // await writeFile(`${path}.min`, html)
  const code = `import { templ } from '${module}'
export default templ(\`${escapeTaggedTemplate(html)}\`)`
  const map = mapifyMemo(name, `${name}.js`, code)
  // await writeFile(`${path}.js`, code)
  // await writeFile(`${path}.map`, map.toString())
  return { code, map }
}

function compileMapified(path, source, module) {
  const name = basename(path)
  const code = `import { templ } from '${module}'
export default templ(\`${escapeTaggedTemplate(source)}\`)`
  const map = mapifyMemo(name, `${name}.js`, source)
  // await writeFile(`${path}.js`, code)
  // await writeFile(`${path}.map`, map.toString())
  return { code, map }
}

module.exports = function compileHtml(path, source, minify, module) {
  return minify ? compileMinified(path, source, module) :
    compileMapified(path, source, module)
}
