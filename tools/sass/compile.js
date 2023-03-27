import { basename } from 'path'
import { compileString } from 'sass'
import compileCss from '../_shared/style/compile.js'

export default function compileSass(path, source, minify, options = {}, module) {
  const name = basename(path)
  options.sourceMap = true
  const { css, sourceMap } = compileString(source, options)
  sourceMap.sources = [name]
  sourceMap.file = `${name}.css`
  return compileCss(path, css, sourceMap, minify, module)
}
