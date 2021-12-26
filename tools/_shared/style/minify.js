import { minify } from 'csso'

export default function minifyCss(from, content) {
  return minify(content, { filename: from, sourceMap: true })
}
