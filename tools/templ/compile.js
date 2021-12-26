import { basename } from 'path'
import minifyHtml from './minify'
import mapifyMemo from '../_shared/mapify'
import escapeTaggedTemplate from '../_shared/escape'

export default function compileHtml(path, source, minify, module) {
  const name = basename(path)
  const html = minify ? minifyHtml(source) : source
  const code = `import { templ } from '${module}'
export default templ(\`${escapeTaggedTemplate(html)}\`)`
  const map = mapifyMemo(name, `${name}.js`, source, minify ? html : undefined)
  return { code, map }
}
