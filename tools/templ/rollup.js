const { createFilter } = require('@rollup/pluginutils')
const compileHtml = require('./compile')
const cachify = require('../_shared/cachify')

const cache = new Map()

module.exports = function
templ({ include = ['**/*.html', '**/*.thtml'], exclude, minify, module = 'bacom' } = {}) {
  const filter = createFilter(include, exclude)
  return {
    name: 'bacomtempl',
    transform(source, id) {
      return filter(id) && cachify(cache, `${id}:${minify}`, async () => {
        const { code, map } = await compileHtml(id, source, minify, module)
        return { code, map: map.toJSON() }
      })
    }
  }
}
