const { SourceMapGenerator } = require('source-map')

function measureSource(source) {
  const lines = source.split(/\r?\n/g)
  return {
    lineCount: lines.length,
    lastLineLen: lines[lines.length - 1].length
  }
}

function startMapping(map, source) {
  map.addMapping({
    source,
    original: {
      line: 1,
      column: 0
    },
    generated: {
      line: 2,
      column: 22
    },
  })
}

module.exports = function mapifyMemo(from, to, source) {
  const { lineCount, lastLineLen } = measureSource(source)
  const map = new SourceMapGenerator({ file: to })
  startMapping(map, from)
  map.addMapping({
    source: from,
    original: {
      line: lineCount,
      column: lastLineLen
    },
    generated: {
      line: lineCount + 1,
      column: lineCount > 1 ? lastLineLen : 22 + lastLineLen
    },
  })
  return map
}

//   mapifyMiniCss(from, to, orig, mini) {
//     const { lineCount, lastLineLen } = measureSource(orig)
//     const map = new SourceMapGenerator({ file: to })
//     addCssStart(map, from)
//     map.addMapping({
//       source: from,
//       original: {
//         line: lineCount,
//         column: lastLineLen
//       },
//       generated: {
//         line: 2,
//         column: 22 + mini.length
//       },
//     })
//     return map
//   },
// }
