const { readFile } = require('fs/promises')
const { createSuite } = require('./_shared/suite')
const { equal } = require('assert')

let content

function bySplit() {
  const lines = content.split(/\n/g)
  return { lineCount: lines.length, lastLineLen: lines[lines.length - 1].length }
}

function bySearch() {
  let lineCount = 1
  const len = content.length
  let pos = 0
  for (let next; pos < len; ++lineCount, pos = next) {
    next = content.indexOf('\n', pos + 1)
    if (next < 0) break
  }
  return { lineCount, lastLineLen: len - pos - 1 }
}

async function countLines() {
  content = await readFile(`${__dirname}/_shared/bootstrap.css`, 'utf8')
  equal(bySplit().lineCount, bySearch().lineCount)
  equal(bySplit().lastLineLen, bySearch().lastLineLen)
  createSuite('Counting lines in a string...')
    .add('by splitting', bySplit)
    .add('by searching', bySearch)
    .start()
}

countLines().catch(error => {
  console.error(error)
  process.exitCode = 1
})
