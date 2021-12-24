import suite from 'tehanu'
import assert from 'assert'
import './dom'
import { comp, event, templ } from '..'

const test = suite('event')

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
}

test('registers on the click event', async () => {
  const el = document.createElement('event-component') as EventComponent
  el.shadowRoot.childNodes[0].dispatchEvent(new CustomEvent('click', {
    bubbles: true,
    cancelable: true,
    composed: true
  }))
  assert.ok(el.clicked)
  assert.ok(el.clicked2)
  assert.ok(el.clicked3)
})
