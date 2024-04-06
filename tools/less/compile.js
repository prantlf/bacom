import { basename } from 'path'
import less from 'less'
import compileCss from '../_shared/style/compile.js'

const { render } = less

export default async function compileLess(path, source, minify, options = {}, module) {
  const name = basename(path)
  options.sourceMap = {}
  let { css, map } = await render(source, options)
  map = JSON.parse(map)
  map.sources = [name]
  map.file = `${name}.css`
  return compileCss(path, css, map, minify, module)
}
