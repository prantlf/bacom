import suite from 'tehanu'
import assert from 'assert'
import './dom.cjs'
import { comp, style, templ } from '..'

const test = suite('comp')

@comp({ tag: 'empty-component' })
class EmptyComponent extends HTMLElement {}

@comp()
class UntaggedComponent extends HTMLElement {}

test('ensures an open shadow dom', () => {
  const el = document.createElement('empty-component')
  assert.ok(el.shadowRoot instanceof ShadowRoot)
  assert.strictEqual(el.shadowRoot.mode, 'open')
})

test('registers the custom element', () => {
  const El = customElements.get('empty-component')
  assert.strictEqual(El, EmptyComponent)
})

test('does not registers a custom element without a tag', () => {
  const el = new UntaggedComponent()
  assert.strictEqual(null, el.tagName)
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

@comp({ tag: 'render-component' })
class RenderComponent extends HTMLElement {
  render(): void {
    this.shadowRoot.innerHTML = '<span></span>'
  }
}

test('supports custom rendering method', async () => {
  const el = document.createElement('render-component')
  assert.strictEqual(el.shadowRoot.innerHTML, '<span></span>')
})

@comp({ tag: 'element-component', template: templ('<span></span>') })
class ElementComponent extends HTMLElement {}

test('renders component content', async () => {
  const el = document.createElement('element-component')
  assert.strictEqual(el.outerHTML, '<element-component></element-component>')
  assert.strictEqual((el.shadowRoot.childNodes[0] as HTMLElement).outerHTML, '<span></span>')
})

@comp({ tag: 'style-component',
        styles: [style('* { font-family: sans-serif }')],
        template: templ('test') })
class StyleComponent extends HTMLElement {}

test('renders component style', async () => {
  const el = document.createElement('style-component')
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
})
