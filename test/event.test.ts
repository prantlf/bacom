import suite from '@prantlf/baretest'
import assert from 'assert'
import { HTMLElement } from './dom/dom-globals'
import { comp, event, templ } from '..'

const test = suite('elem')

@comp({ tag: 'event-component', template: templ('<span id=span></span>') })
class EventComponent extends HTMLElement {
  clicked: boolean
  clicked2: boolean
  clicked3: boolean

  @event()
  onClick() { this.clicked = true }

  @event({ name: 'click', id: 'span' })
  onClick2() { this.clicked2 = true }

  @event({ name: 'click', sel: '#span' })
  onClick3() { this.clicked3 = true }

  constructor() {
    super('event-component') // workaround for dom-lite
  }
}

test('registers on the click event', async () => {
  const el = document.createElement('event-component')
  el.shadowRoot.childNodes[0].dispatchEvent(new Event('click', {
    bubbles: true,
    cancelable: true,
    composed: true
  }))
  assert.ok((el as any).clicked)
  assert.ok((el as any).clicked2)
  assert.ok((el as any).clicked3)
})

if (module === require.main) test.run()
else module.exports = test
