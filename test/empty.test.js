const test = require('@prantlf/baretest')('empty')
const assert = require('assert')
require('./dom/dom-globals')
const { empty } = require('..')

test('leaves an empty element intact', () => {
  const el = document.createElement('div')
  empty(el)
  assert.strictEqual(el.innerHTML, '')
})

test('removes all children', () => {
  const el = document.createElement('div')
  el.innerHTML = '<span>1</span><div>2</div>'
  empty(el)
  assert.strictEqual(el.innerHTML, '')
})

if (module === require.main) test.run()
else module.exports = test
