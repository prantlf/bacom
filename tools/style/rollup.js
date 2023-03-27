import { createFilter } from '@rollup/pluginutils'
import compileCss from '../_shared/style/compile.js'
import cachify from '../_shared/cachify.js'

const cache = new Map()

export default function style({ include = ['**/*.css'], exclude, minify, module = 'bacom' } = {}) {
  const filter = createFilter(include, exclude)
  return {
    name: 'bacomstyle',
    transform(source, id) {
      return filter(id) && cachify(cache, `${id}:${minify}`, async () => {
        const { code, map } = await compileCss(id, source, undefined, minify, module)
        return { code, map: map.toJSON() }
      })
    }
  }
}
