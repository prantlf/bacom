import { SourceMapGenerator } from 'source-map'

function measureSource(source) {
  let lineCount = 1
  const len = source.length
  let pos = 0
  for (let next = 0; pos < len; ++lineCount, pos = next) {
    next = source.indexOf('\n', pos + 1)
    if (next < 0) break
  }
  return {
    lineCount,
    lastLineLen: len - pos
  }
}

export default function mapifyMemo(from, to, source, output) {
  const map = new SourceMapGenerator({ file: to })
  map.setSourceContent(from, source)
  map.addMapping({
    source: from,
    original: {
      line: 1,
      column: 0
    },
    generated: {
      line: 2,
      column: 21
    }
  })
  let { lineCount, lastLineLen } = measureSource(source)
  const original = { line: lineCount, column: lastLineLen }
  if (output !== undefined) {
    ({ lineCount, lastLineLen } = measureSource(output))
  }
  const generated = {
    line: lineCount + 1,
    column: lineCount > 1 ? lastLineLen : 22 + lastLineLen
  }
  map.addMapping({ source: from, original, generated })
  return map
}
