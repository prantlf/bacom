import compileHtml from './compile'

export default function templ(content, noMap, meta) {
  let loaderOptions = this.getOptions({
    type: 'object',
    title: 'bacom/templ options',
    properties: {
      minify: { type: 'boolean' },
      module: { type: 'string' }
    }
  })
  const { minify, module } = Object.assign({
    minify: this.mode === 'production',
    module: 'bacom'
  }, loaderOptions)
  const { code, map } =  compileHtml(this.resourcePath, content, minify, module)
  this.callback(null, code, map.toJSON(), meta)
}
