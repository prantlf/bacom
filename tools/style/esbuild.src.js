import { readFile } from 'fs/promises'
import { dirname } from 'path'
import compileCss from '../_shared/style/compile'
import inlineMap from '../_shared/inline'
import cachify from '../_shared/cachify'

const cache = new Map()

export default function style({ filter = '\\.css$', minify, module = 'bacom' } = {}) {
  filter = new RegExp(filter)
  return {
    name: 'bacomstyle',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) =>
        cachify(cache, `${path}:${minify}`, async () => {
          const source = await readFile(path, 'utf8')
          const { code, map } = await compileCss(path, source, undefined, minify, module)
          const contents = `${code}
${inlineMap(map)}`
          return { contents, resolveDir: dirname(path) }
        })
      )
    }
  }
}
