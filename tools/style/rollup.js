const { createFilter } = require('@rollup/pluginutils')
const compileCss = require('./compile')
const cachify = require('../_shared/cachify')

const cache = new Map()

module.exports = function
style({ include = ['**/*.css'], exclude, minify, module = 'bacom' } = {}) {
  const filter = createFilter(include, exclude)
  return {
    name: 'bacomstyle',
    transform(source, id) {
      return filter(id) && cachify(cache, `${id}:${minify}`, async () => {
        const { code, map } = await compileCss(id, source, minify, module)
        return { code, map: map.toJSON() }
      })
    }
  }
}
