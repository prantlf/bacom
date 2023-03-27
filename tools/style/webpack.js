import { urlToRequest } from 'loader-utils'
import compileCss from '../_shared/style/compile.js'

export default function templ(content, map, meta) {
  let loaderOptions = this.getOptions({
    type: 'object',
    title: 'bacom/style options',
    properties: {
      minify: { type: 'boolean' },
      module: { type: 'string' }
    }
  })
  const { minify, module } = Object.assign({
    minify: this.mode === 'production',
    module: 'bacom'
  }, loaderOptions)
  const callback = this.async()
  compileCss(urlToRequest(this.resourcePath), content, map, minify, module)
    .then(({ code, map }) => callback(null, code, map.toJSON(), meta))
    .catch(error => callback(error))
}
