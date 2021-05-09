const test = require('tehanu')('eventize')
const assert = require('assert')
require('./dom')
const { eventize } = require('..')

test('cuts the prefix "on"', () => {
  assert.strictEqual(eventize('ontest'), 'test')
})

test('enforces lower-case', () => {
  assert.strictEqual(eventize('Test'), 'test')
})
