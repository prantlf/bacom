import suite from '@prantlf/baretest'
import assert from 'assert'
import { HTMLElement, ShadowRoot } from './dom/dom-globals'
import { comp, style } from '..'

const test = suite('comp')

@comp({ tag: 'empty-component' })
class EmptyComponent extends HTMLElement {
  constructor() {
    super('empty-component') // workaround for dom-lite
  }
}

test('ensures an open shadow dom', () => {
  const el = document.createElement('empty-component')
  assert.ok(el.shadowRoot instanceof ShadowRoot)
  assert.strictEqual(el.shadowRoot.mode, 'open')
})

test('registers the custom element', () => {
  const El = customElements.get('empty-component')
  assert.strictEqual(El, EmptyComponent)
})

test('renders an empty shadow dom by default', async () => {
  const el = document.createElement('empty-component')
  assert.strictEqual(el.outerHTML, '<empty-component></empty-component>')
  assert.strictEqual(el.shadowRoot.firstChild, null)
})

@comp({ tag: 'element-component' })
class ElementComponent extends HTMLElement {
  constructor() {
    super('element-component') // workaround for dom-lite
  }

  render(): HTMLElement {
    return document.createElement('span')
  }
}

test('renders component content', async () => {
  const el = document.createElement('element-component')
  document.body.appendChild(el)
  el.connectedCallback() // workaround for dom-lite
  await el.updateComplete
  assert.strictEqual(el.outerHTML, '<element-component></element-component>')
  assert.strictEqual(el.shadowRoot.childNodes[0].outerHTML, '<span></span>')
  document.body.removeChild(el)
})

test('replaces previous component content when rendering', async () => {
  const el = document.createElement('element-component')
  el.shadowRoot.appendChild(document.createElement('div'))
  document.body.appendChild(el)
  el.connectedCallback() // workaround for dom-lite
  await el.updateComplete
  assert.strictEqual(el.outerHTML, '<element-component></element-component>')
  assert.strictEqual(el.shadowRoot.childNodes[0].outerHTML, '<span></span>')
  document.body.removeChild(el)
})

test('does not wait for an update if none was requested', async () => {
  const el = document.createElement('element-component')
  await el.updateComplete
})

@comp({ tag: 'style-component', styles: [style('* { font-family: sans-serif }')] })
class StyleComponent extends HTMLElement {
  constructor() {
    super('style-component') // workaround for dom-lite
  }

  render(): DocumentFragment {
    const fragment = document.createDocumentFragment()
    fragment.appendChild(document.createTextNode('test'))
    return fragment
  }
}

test('renders component style', async () => {
  const el = document.createElement('style-component')
  document.body.appendChild(el)
  el.connectedCallback() // workaround for dom-lite
  await el.updateComplete
  const { adoptedStyleSheets } = el.shadowRoot
  const expectedStyle = '* { font-family: sans-serif }'
  const expectedContent = adoptedStyleSheets
    ? 'test' : `<style>${expectedStyle}</style>test`
  assert.strictEqual(el.outerHTML, '<style-component></style-component>')
  let shadowContent = ''
  for (const child of el.shadowRoot.childNodes) {
    shadowContent += child.outerHTML || child.nodeValue
  }
  assert.strictEqual(shadowContent, expectedContent)
  if (adoptedStyleSheets) {
    assert.strictEqual(adoptedStyleSheets.length, 1)
    assert.strictEqual(adoptedStyleSheets[0].toString(), expectedStyle)
  }
  document.body.removeChild(el)
})

@comp({ tag: 'connected-component' })
class ConnectedComponent extends HTMLElement {
  constructor() {
    super('connected-component') // workaround for dom-lite
  }

  connectedCallback() {
    this.called = true
  }
}

test('supports custom connectedCallback', async () => {
  const el = document.createElement('connected-component')
  document.body.appendChild(el)
  el.connectedCallback() // workaround for dom-lite
  assert.ok(el.called)
  document.body.removeChild(el)
})

if (module === require.main) test.run()
else module.exports = test
