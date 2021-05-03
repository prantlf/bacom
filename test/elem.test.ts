import suite from '@prantlf/baretest'
import assert from 'assert'
import { HTMLElement } from './dom/dom-globals'
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

  constructor() {
    super('elem-component') // workaround for dom-lite
  }
}

test('picks elements by id or selector', async () => {
  const el = document.createElement('elem-component')
  const span = el.shadowRoot.childNodes[0]
  assert.strictEqual((el as any).span, span)
  assert.strictEqual((el as any).id2, span)
  assert.strictEqual((el as any).sel, span)
})

if (module === require.main) test.run()
else module.exports = test
