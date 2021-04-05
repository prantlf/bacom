const test = require('@prantlf/baretest')('render')
const assert = require('assert')
require('./dom/dom-globals')
const { render } = require('..')

test('inserts a new element', () => {
  const parent = document.createElement('div')
  const child = document.createElement('div')
  child.textContent = 2
  render(parent, child)
  assert.strictEqual(parent.innerHTML, '<div>2</div>')
})

test('sets a string content', () => {
  const parent = document.createElement('div')
  render(parent, '<div>2</div>')
  assert.strictEqual(parent.innerHTML, '<div>2</div>')
})

test('replaces the old content', () => {
  const parent = document.createElement('div')
  parent.innerHTML = '<span>1</span>'
  const child = document.createElement('div')
  child.textContent = 2
  render(parent, child)
  assert.strictEqual(parent.innerHTML, '<div>2</div>')
})

if (module === require.main) test.run()
else module.exports = test
