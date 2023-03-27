import { urlToRequest } from 'loader-utils'
import compileSass from './compile.js'

export default function templ(content, noMap, meta) {
  let loaderOptions = this.getOptions({
    type: 'object',
    title: 'bacom/sass options',
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
  compileSass(urlToRequest(this.resourcePath), content, minify, options, module)
    .then(({ code, map }) => callback(null, code, map.toJSON(), meta))
    .catch(error => callback(error))
}
