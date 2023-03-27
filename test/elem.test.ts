import suite from 'tehanu'
import assert from 'assert'
import './dom.cjs'
import { comp, elem, templ } from '..'

const test = suite('elem')

@comp({ tag: 'elem-component', template: templ('<span id=span></span>') })
class ElemComponent extends HTMLElement {
  @elem()
  public span

  @elem({ id: 'span' })
  public id2

  @elem({ sel: '#span' })
  public sel
}

test('picks elements by id or selector', async () => {
  const el = document.createElement('elem-component') as ElemComponent
  const span = el.shadowRoot.childNodes[0]
  assert.strictEqual(el.span, span)
  assert.strictEqual(el.id2, span)
  assert.strictEqual(el.sel, span)
})

test('accepts declarative shadow dom', async () => {
  const el = document.createElement('div')
  el.innerHTML = '<elem-component a=b><template shadowroot=open><span id=span></span></template></elem-component>'
  assert.strictEqual((el.firstChild as ElemComponent).span.outerHTML, '<span id="span"></span>')
})
