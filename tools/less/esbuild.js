import { readFile } from 'fs/promises'
import { dirname } from 'path'
import inlineMap from '../_shared/inline.js'
import compileLess from './compile.js'
import cachify from '../_shared/cachify.js'

const cache = new Map()

export default function less({ filter = '\\.less$', minify, options, module = 'bacom' } = {}) {
  filter = new RegExp(filter)
  return {
    name: 'bacomless',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) =>
        cachify(cache, `${path}:${minify}`, async () => {
          const source = await readFile(path, 'utf8')
          const { code, map } = await compileLess(path, source, minify, options, module)
          const contents = `${code}
${inlineMap(map)}`
          return { contents, resolveDir: dirname(path) }
        })
      )
    }
  }
}
