import suite from 'tehanu'
import assert from 'assert'
import './dom'
import { comp, style, templ } from '..'

const test = suite('comp')

@comp({ tag: 'empty-component' })
class EmptyComponent extends HTMLElement {}

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

test('accepts declarative shadow dom', async () => {
  const el = document.createElement('div')
  el.innerHTML = '<empty-component a=b><template shadowroot=open><hr></template></empty-component>'
  assert.strictEqual((el.firstChild as HTMLElement).outerHTML, '<empty-component a="b"></empty-component>')
  assert.strictEqual((el.firstChild as HTMLElement).shadowRoot.innerHTML, '<hr>')
})

@comp({ tag: 'element-component', template: templ('<span></span>') })
class ElementComponent extends HTMLElement {}

test('renders component content', async () => {
  const el = document.createElement('element-component')
  document.body.appendChild(el)
  assert.strictEqual(el.outerHTML, '<element-component></element-component>')
  assert.strictEqual((el.shadowRoot.childNodes[0] as HTMLElement).outerHTML, '<span></span>')
  document.body.removeChild(el)
})

test('replaces previous component content when rendering', async () => {
  const el = document.createElement('element-component')
  el.shadowRoot.appendChild(document.createElement('div'))
  document.body.appendChild(el)
  assert.strictEqual(el.outerHTML, '<element-component></element-component>')
  assert.strictEqual((el.shadowRoot.childNodes[0] as HTMLElement).outerHTML, '<span></span>')
  document.body.removeChild(el)
})

@comp({ tag: 'style-component',
        styles: [style('* { font-family: sans-serif }')],
        template: templ('test') })
class StyleComponent extends HTMLElement {}

test('renders component style', async () => {
  const el = document.createElement('style-component')
  document.body.appendChild(el)
  const { adoptedStyleSheets } = el.shadowRoot as any
  const expectedStyle = '* { font-family: sans-serif }'
  const expectedContent = adoptedStyleSheets
    ? 'test' : `<style>${expectedStyle}</style>test`
  assert.strictEqual(el.outerHTML, '<style-component></style-component>')
  let shadowContent = ''
  for (const child of el.shadowRoot.childNodes) {
    shadowContent += (child as HTMLElement).outerHTML || child.nodeValue
  }
  assert.strictEqual(shadowContent, expectedContent)
  if (adoptedStyleSheets) {
    assert.strictEqual(adoptedStyleSheets.length, 1)
    assert.strictEqual(adoptedStyleSheets[0].toString(), expectedStyle)
  }
  document.body.removeChild(el)
})
