import { SourceMapGenerator } from 'source-map'

function measureSource(source) {
  let lineCount = 1
  const len = source.length
  let pos = 0
  for (let next; pos < len; ++lineCount, pos = next) {
    next = source.indexOf('\n', pos + 1)
    if (next < 0) break
  }
  return {
    lineCount,
    lastLineLen: len - pos - 1
  }
}

export default function mapifyMemo(from, to, name, source, output) {
  const map = new SourceMapGenerator({ file: to })
  map.setSourceContent(from, source)
  const nameLen = name.length
  map.addMapping({
    source: from,
    original: { line: 1, column: 0 },
    generated: { line: 2, column: 10 + nameLen }
  })
  let { lineCount, lastLineLen } = measureSource(source)
  const original = { line: lineCount, column: lastLineLen }
  if (output !== undefined) {
    ({ lineCount, lastLineLen } = measureSource(output))
  }
  const generated = {
    line: lineCount + 1,
    column: lineCount > 1 ? lastLineLen + 2 : lastLineLen + nameLen + 20
  }
  map.addMapping({ source: from, original, generated })

  return map
}
