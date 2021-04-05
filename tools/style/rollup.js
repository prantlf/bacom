import { createFilter } from '@rollup/pluginutils'

export default function style({ include, exclude, module = 'bacom' } = {}) {
  const filter = createFilter(include || ['**/*.css'], exclude)

  return {
    name: 'bacomstyle',
    transform(code, id) {
      if (!filter(id)) return

      return {
        code: `import { style } from '${module}'
export default style(${JSON.stringify(code)})`,
        map: { mappings: '' }
      }
    }
  }
}
