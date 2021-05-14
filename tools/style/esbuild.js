const { readFile } = require('fs/promises')
const { dirname } = require('path')
const compileCss = require('./compile')
const inlineMap = require('../_shared/inline')
const cachify = require('../_shared/cachify')

const cache = new Map()

module.exports = function
style({ filter = '\\.css$', minify, module = 'bacom' } = {}) {
  filter = new RegExp(filter)
  return {
    name: 'bacomstyle',
    setup(build) {
      build.onLoad({ filter }, async ({ path }) =>
        cachify(cache, `${path}:${minify}`, async () => {
          const source = await readFile(path, 'utf8')
          const { code, map } = await compileCss(path, source, minify, module)
          const contents = `${code}
${inlineMap(map)}`
          return { contents, resolveDir: dirname(path) }
        })
      )
    }
  }
}
