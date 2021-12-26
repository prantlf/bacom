const { readFile } = require('fs/promises')
const { createSuite } = require('./_shared/suite')
const { equal } = require('assert')

let content

function bySplit() {
  const lines = content.split(/\n/g)
  return lines.length
}

function bySearch() {
  let count = 1
  for (let len = content.length, pos = 0, next; pos < len; ++count, pos = next) {
    next = content.indexOf('\n', pos + 1)
    if (next < 0) break
  }
  return count
}

async function countLines() {
  content = await readFile(`${__dirname}/_shared/bootstrap.css`, 'utf8')
  equal(bySplit(), bySearch())
  createSuite('Counting lines in a string...')
    .add('by splitting', bySplit)
    .add('by searching', bySearch)
    .start()
}

countLines().catch(error => {
  console.error(error)
  process.exitCode = 1
})
