import { createFilter } from '@rollup/pluginutils'

export default function style({ include, exclude, module = 'bacom' } = {}) {
  const filter = createFilter(include || ['**/*.css'], exclude)
  return {
    name: 'bacomstyle',
    transform(source, id) {
      if (!filter(id)) return
      return {
        code: `import { style } from '${module}'
export default style(${JSON.stringify(source)})`,
        map: { mappings: '' }
      }
    }
  }
}
