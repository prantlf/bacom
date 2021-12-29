import { urlToRequest } from 'loader-utils'
import compileLess from './compile'

export default function less(content, noMap, meta) {
  const loaderOptions = this.getOptions({
    type: 'object',
    title: 'bacom/less options',
    properties: {
      minify: { type: 'boolean' },
      options: { type: 'object' },
      module: { type: 'string' }
    }
  })
  const { minify, options, module } = Object.assign({
    minify: this.mode === 'production',
    options: {},
    module: 'bacom'
  }, loaderOptions)
  const callback = this.async()
  compileLess(urlToRequest(this.resourcePath), content, minify, options, module)
    .then(({ code, map }) => callback(null, code, map.toJSON(), meta))
    .catch(error => callback(error))
}
