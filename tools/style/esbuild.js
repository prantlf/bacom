const { readFile } = require('fs/promises')
const { dirname } = require('path')

module.exports = function style({ module = 'bacom' } = {}) {
  return {
    name: 'bacomstyle',
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
        const source = await readFile(path, 'utf8')
        return {
          contents: `import { style } from '${module}'
export default style(${JSON.stringify(source)})`,
          resolveDir: dirname(path)
        }
      })
    }
  }
}
