import { createFilter } from '@rollup/pluginutils'
import compileSass from './compile.js'
import cachify from '../_shared/cachify.js'

const cache = new Map()

export default function sass({ include = ['**/*.sass', '**/*.scss'], exclude, minify, options, module = 'bacom' } = {}) {
  const filter = createFilter(include, exclude)
  return {
    name: 'bacomsass',
    transform(source, id) {
      return filter(id) && cachify(cache, `${id}:${minify}`, async () => {
        const { code, map } = await compileSass(id, source, minify, options, module)
        return { code, map: map.toJSON() }
      })
    }
  }
}
