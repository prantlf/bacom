const { readFile } = require('fs/promises')
const { dirname } = require('path')

module.exports = function style({ module = 'bacom' } = {}) {
  return {
    name: 'bacomtempl',
    setup(build) {
      build.onLoad({ filter: /\.t?html$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8')
        return {
          contents: `import { templ } from '${module}'
export default templ(${JSON.stringify(source)})`,
          resolveDir: dirname(path)
        }
      })
    }
  }
}
