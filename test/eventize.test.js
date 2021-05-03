const test = require('@prantlf/baretest')('eventize')
const assert = require('assert')
require('./dom/dom-globals')
const { eventize } = require('..')

test('cuts the prefix "on"', () => {
  assert.strictEqual(eventize('ontest'), 'test')
})

test('enforces lower-case', () => {
  assert.strictEqual(eventize('Test'), 'test')
})

if (module === require.main) test.run()
else module.exports = test
