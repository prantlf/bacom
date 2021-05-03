import { createFilter } from '@rollup/pluginutils'

export default function style({ include, exclude, module = 'bacom' } = {}) {
  const filter = createFilter(include || ['**/*.html', '**/*.thtml'], exclude)
  return {
    name: 'bacomtempl',
    transform(source, id) {
      if (!filter(id)) return
      return {
        code: `import { templ } from '${module}'
export default templ(${JSON.stringify(source)})`,
        map: { mappings: '' }
      }
    }
  }
}
