import suite from '@prantlf/baretest'
import assert from 'assert'
import { HTMLElement } from './dom/dom-globals'
import { comp, prop } from '..'

const test = suite('prop')

@comp({ tag: 'prop-component' })
class PropComponent extends HTMLElement {
  @prop({ type: 'string' })
  string

  @prop({ type: 'number' })
  number

  @prop({ type: 'boolean' })
  boolean

  constructor() {
    super('prop-component') // workaround for dom-lite
  }
}

// workaround for dom-lite
const origHasAttribute = PropComponent.prototype.hasAttribute
PropComponent.prototype.hasAttribute = function(name) {
  if (name === 'string' || name === 'number') return true
  if (name === 'boolean') return this[name]
  return origHasAttribute.call(this, name)
}
const origGetAttribute = PropComponent.prototype.getAttribute
PropComponent.prototype.getAttribute = function(name) {
  if (name === 'boolean') return ''
  return origGetAttribute.call(this, name)
}

test('assigns an empty string to a string by default', () => {
  const el = document.createElement('prop-component')
  assert.strictEqual(el.string, '')
})

test('assigns zero to a number by default', () => {
  const el = document.createElement('prop-component')
  assert.strictEqual(el.number, 0)
})

test('assigns false to a boolean by default', () => {
  const el = document.createElement('prop-component')
  assert.strictEqual(el.boolean, false)
})

test('does not reflect defalut property values to attributes', async () => {
  const el = document.createElement('prop-component')
  assert.strictEqual(el.outerHTML, '<prop-component string="" number="0"></prop-component>')
})

test('reflects a new property value to the attribute', async () => {
  const el = document.createElement('prop-component')
  el.string = 'test'
  assert.strictEqual(el.outerHTML, '<prop-component string="test" number="0"></prop-component>')
})

test('converts a number to string when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component')
  el.number = 1
  assert.strictEqual(el.outerHTML, '<prop-component string="" number="1"></prop-component>')
})

test('converts a true to an empty string when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component')
  el.boolean = true
  assert.strictEqual(el.outerHTML, '<prop-component string="" number="0" boolean=""></prop-component>')
})

test('converts a false to attribute removal when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component')
  el.boolean = false
  assert.strictEqual(el.outerHTML, '<prop-component string="" number="0"></prop-component>')
})

test('reflects the attribute value to a property', async () => {
  const el = document.createElement('prop-component')
  el.attributeChangedCallback('string', '', 'test') // workaround for dom-lite
  assert.strictEqual(el.string, 'test')
})

test('converts other type to string for a string property', async () => {
  const el = document.createElement('prop-component')
  el.string = 1
  assert.strictEqual(el.string, '1')
})

test('sets a string property to default on invalid input', async () => {
  const el = document.createElement('prop-component')
  el.string = null
  assert.strictEqual(el.string, '')
})

test('sets a number property to default on invalid input', async () => {
  const el = document.createElement('prop-component')
  el.number = NaN
  assert.strictEqual(el.number, 0)
})

test('converts other type to boolean for a boolean property', async () => {
  const el = document.createElement('prop-component')
  el.boolean = ''
  assert.strictEqual(el.boolean, true)
})

test('sets a boolean property to default on invalid input', async () => {
  const el = document.createElement('prop-component')
  el.boolean = null
  assert.strictEqual(el.boolean, false)
})

@comp({ tag: 'attribute-component' })
class AttributeComponent extends HTMLElement {
  constructor() {
    super('attribute-component') // workaround for dom-lite
  }

  attributeChangedCallback(name, oldValue, newValue) {
    assert.strictEqual(name, 'name')
    assert.strictEqual(oldValue, '')
    assert.strictEqual(newValue, 'value')
    this.called = true
  }

  static observedAttributes = ['name']
}

test('supports custom attributeChangedCallback', async () => {
  const el = document.createElement('attribute-component')
  el.setAttribute('name', 'value')
  el.attributeChangedCallback('name', '', 'value') // workaround for dom-lite
  assert.ok(el.called)
})

if (module === require.main) test.run()
else module.exports = test
