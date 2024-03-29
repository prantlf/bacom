const test = require('tehanu')('dasherize')
const assert = require('assert')
require('./dom.cjs')
const { dasherize } = require('../dist/index.cjs')

test('a single word', () => {
  assert.strictEqual(dasherize('test'), 'test')
})

test('two words', () => {
  assert.strictEqual(dasherize('testTwo'), 'test-two')
})

test('only uppercase letters', () => {
  assert.strictEqual(dasherize('AMD'), 'amd')
})

test('multiple uppercase letters at the end', () => {
  assert.strictEqual(dasherize('testAMD'), 'test-amd')
})

test('multiple uppercase letters at the beginning', () => {
  assert.strictEqual(dasherize('AMDTest'), 'amd-test')
})

test('multiple uppercase letters in the middle', () => {
  assert.strictEqual(dasherize('myAMDTest'), 'my-amd-test')
})
