import { readFile } from 'fs/promises'
import { dirname } from 'path'
import compileHtml from './compile.js'
import inlineMap from '../_shared/inline.js'
import cachify from '../_shared/cachify.js'

const cache = new Map()

export default function templ({ filter = '\\.t?html$', minify, module = 'bacom' } = {}) {
  filter = new RegExp(filter)
  return {
    name: 'bacomtempl',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) =>
        cachify(cache, `${path}:${minify}`, async () => {
          const source = await readFile(path, 'utf8')
          const { code, map } = compileHtml(path, source, minify, module)
          const contents = `${code}
${inlineMap(map)}`
          return { contents, resolveDir: dirname(path) }
        })
      )
    }
  }
}
