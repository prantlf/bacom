import suite from 'tehanu'
import assert from 'assert'
import './dom.cjs'
import { comp, prop } from '..'

const test = suite('prop')

@comp({ tag: 'prop-component' })
class PropComponent extends HTMLElement {
  @prop({ type: 'string', reflect: true })
  string

  @prop({ type: 'number', reflect: true })
  number

  @prop({ type: 'boolean', reflect: true })
  boolean

  @prop({ type: 'string', reflect: true })
  dashedName

  @prop({ type: 'string' })
  noReflect
}

test('assigns an empty string to a string by default', () => {
  const el = document.createElement('prop-component') as PropComponent
  assert.strictEqual(el.string, '')
})

test('assigns zero to a number by default', () => {
  const el = document.createElement('prop-component') as PropComponent
  assert.strictEqual(el.number, 0)
})

test('assigns false to a boolean by default', () => {
  const el = document.createElement('prop-component') as PropComponent
  assert.strictEqual(el.boolean, false)
})

test('assigns a default value to a dasherized attribute', () => {
  const el = document.createElement('prop-component') as PropComponent
  assert.strictEqual(el.dashedName, '')
})

test('does not reflect default property values to attributes', async () => {
  const el = document.createElement('prop-component')
  assert.strictEqual(el.outerHTML, '<prop-component></prop-component>')
})

test('reflects a new property value to the attribute', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.string = 'test'
  assert.strictEqual(el.outerHTML, '<prop-component string="test"></prop-component>')
})

test('reflects a property value to the dasherized attribute', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.dashedName = 'test'
  assert.strictEqual(el.outerHTML, '<prop-component dashed-name="test"></prop-component>')
})

test('does not reflect a property value to the attribute if reflection disabled', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.noReflect = 'test'
  assert.strictEqual(el.outerHTML, '<prop-component></prop-component>')
})

test('converts a number to string when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.number = 1
  assert.strictEqual(el.outerHTML, '<prop-component number="1"></prop-component>')
})

test('converts a true to an empty string when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.boolean = true
  assert.strictEqual(el.outerHTML, '<prop-component boolean=""></prop-component>')
})

test('converts a false to attribute removal when reflecting the value to the attribute', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.boolean = false
  assert.strictEqual(el.outerHTML, '<prop-component></prop-component>')
})

test('reflects the attribute value to a property', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.setAttribute('string', 'test')
  assert.strictEqual(el.string, 'test')
})

test('reflects the dasherized attribute value to a property', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.setAttribute('dashed-name', 'test')
  assert.strictEqual(el.dashedName, 'test')
})

test('converts other type to string for a string property', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.string = 1
  assert.strictEqual(el.string, '1')
})

test('sets a string property to default on invalid input', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.string = null
  assert.strictEqual(el.string, '')
})

test('sets a number property to default on invalid input', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.number = NaN
  assert.strictEqual(el.number, 0)
})

test('converts other type to boolean for a boolean property', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.boolean = ''
  assert.strictEqual(el.boolean, true)
})

test('sets a boolean property to default on invalid input', async () => {
  const el = document.createElement('prop-component') as PropComponent
  el.boolean = null
  assert.strictEqual(el.boolean, false)
})

@comp({ tag: 'attribute-component' })
class AttributeComponent extends HTMLElement {
  called

  attributeChangedCallback(name, oldValue, newValue) {
    assert.strictEqual(name, 'name')
    assert.strictEqual(oldValue, null)
    assert.strictEqual(newValue, 'value')
    this.called = true
  }

  static observedAttributes = ['name']
}

test('supports custom attributeChangedCallback', async () => {
  const el = document.createElement('attribute-component') as AttributeComponent
  el.setAttribute('name', 'value')
  assert.ok(el.called)
})
