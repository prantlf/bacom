const test = require('tehanu')('attr')
const assert = require('assert')
require('./dom.cjs')
const { attr } = require('../dist/index.cjs')

test('remove an attribute', () => {
  const el = document.createElement('div')
  el.setAttribute('test', 1)
  attr(el, 'test', null)
  assert.ok(!el.hasAttribute('test'))
})

test('remove a boolean attribute', () => {
  const el = document.createElement('div')
  el.setAttribute('test', 1)
  attr(el, 'test', false)
  assert.ok(!el.hasAttribute('test'))
})

test('set a boolean attribute', () => {
  const el = document.createElement('div')
  attr(el, 'test', true)
  assert.strictEqual(el.getAttribute('test'), '')
})

test('set a numeric attribute', () => {
  const el = document.createElement('div')
  attr(el, 'test', 1)
  assert.strictEqual(el.getAttribute('test'), '1')
})

test('set a textual attribute', () => {
  const el = document.createElement('div')
  attr(el, 'test', '1')
  assert.strictEqual(el.getAttribute('test'), '1')
})
