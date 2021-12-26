import { createFilter } from '@rollup/pluginutils'
import compileLess from './compile'
import cachify from '../_shared/cachify'

const cache = new Map()

export default function less({ include = ['**/*.less'], exclude, minify, options, module = 'bacom' } = {}) {
  const filter = createFilter(include, exclude)
  return {
    name: 'bacomless',
    transform(source, id) {
      return filter(id) && cachify(cache, `${id}:${minify}`, async () => {
        const { code, map } = await compileLess(id, source, minify, options, module)
        return { code, map: map.toJSON() }
      })
    }
  }
}
