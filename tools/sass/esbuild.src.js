import { readFile } from 'fs/promises'
import { dirname } from 'path'
import inlineMap from '../_shared/inline'
import compileSass from './compile'
import cachify from '../_shared/cachify'

const cache = new Map()

export default function sass({ filter = '\\.s[ac]ss$', minify, options, module = 'bacom' } = {}) {
  filter = new RegExp(filter)
  return {
    name: 'bacomsass',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) =>
        cachify(cache, `${path}:${minify}`, async () => {
          const source = await readFile(path, 'utf8')
          const { code, map } = await compileSass(path, source, minify, options, module)
          const contents = `${code}
${inlineMap(map)}`
          return { contents, resolveDir: dirname(path) }
        })
      )
    }
  }
}
