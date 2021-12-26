import { basename } from 'path'
import minifyHtml from './minify'
import mapifyMemo from '../_shared/mapify'
import escapeTaggedTemplate from '../_shared/escape'

async function compileMinified(path, source, module) {
  const name = basename(path)
  const html = await minifyHtml(source)
  const code = `import { templ } from '${module}'
export default templ(\`${escapeTaggedTemplate(html)}\`)`
  const map = mapifyMemo(name, `${name}.js`, source, html)
  return { code, map }
}

function compileMapified(path, source, module) {
  const name = basename(path)
  const code = `import { templ } from '${module}'
export default templ(\`${escapeTaggedTemplate(source)}\`)`
  const map = mapifyMemo(name, `${name}.js`, source)
  return { code, map }
}

export default function compileHtml(path, source, minify, module) {
  return minify ? compileMinified(path, source, module) :
    compileMapified(path, source, module)
}
