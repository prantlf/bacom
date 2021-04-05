const { Document, HTMLElement } = require('dom-lite')
const { performance } = require('perf_hooks')

let now
if (typeof performance === 'undefined') { // browser
  now = () => {
    const time = process.hrtime()
    return time[0] * 1e3 + time[1] / 1e6
  }
} else { // node
  now = () => performance.now()
}

// Event listeners are stored in arrays organised by their types in an object.
// el.eventListeners = {
//   click: [
//       { target, handler, useCapture }
//       { target, handler, useCapture }
//       ...
//     ]
//   ...
// }

class Event {
  static NONE = 0
  static CAPTURING_PHASE = 1
  static AT_TARGET = 2
  static BUBBLING_PHASE = 3

  isTrusted = false
  bubbles = false
  cancelable = false
  composed = false
  defaultPrevented = false
  cancelBubble = false
  cancelImmediate = false
  eventPhase = NONE
  timeStamp = now()

  constructor(type, options) {
    this.type = type.toLowerCase()
    Object.assign(this, options)
  }

  preventDefault() {
    this.defaultPrevented = true
  }

  stopPropagation() {
    this.cancelBubble = true
  }

  stopImmediatePropagation() {
    this.cancelImmediate = true
  }

  composedPath() {
    let el = this.target
    let path = [el]
    while ((el = el.parentNode)) {
      const { shadowRoot } = el
      if (shadowRoot) {
        // if the event is not composed and an ancestor of the target element
        // has a shadow dom, cut the path to start with the custom element
        if (!this.composed || shadowRoot.mode === "closed") path = [el]
        else path.push(shadowRoot, el)
      } else {
        path.push(el)
      }
    }
    return path
  }
}

// calls event handlers registered for the specific event on the specified
// element and returns true if the bubbling was cancelled by a handler
function callEventHandlers(el, event, capture) {
  const eventListeners = getEventListeners(el, event.type)
  for (const { handler, useCapture } of eventListeners) {
    // call the handler if it is the target or if useCapture matches
    if (capture === undefined || capture === useCapture) {
      event.currentTarget = el
      handler(event)
      if (event.cancelImmediate) return true
    }
  }
  if (event.cancelBubble) return true
}

// ensures a lower-case event type and a boolean useCapture
function normalizeEvent(type, useCapture) {
  type = type.toLowerCase()
  useCapture = useCapture || false
  return { type, useCapture }
}

// gets an array of event listeners for the specified event type
function getEventListeners(el, type) {
  const allListeners = el.eventListeners || (el.eventListeners = {})
  return allListeners[type] || (allListeners[type] = [])
}

const EventTarget = {
  dispatchEvent(event) {
    if (!event.type) throw new Error('UNSPECIFIED_EVENT_TYPE_ERR')
    event.target = this

    const path = event.composedPath()
    path.shift() // the event on the target node will lbe triggered explicitly

    event.eventPhase = Event.CAPTURING_PHASE
    for (const el of path.reverse()) {
      if (callEventHandlers(el, event, true)) return result()
    }

    event.eventPhase = Event.AT_TARGET
    if (callEventHandlers(this, event)) return result()

    if (event.bubbles) {
      event.eventPhase = Event.BUBBLING_PHASE
      for (const el of path) {
        if (callEventHandlers(el, event, false)) return result()
      }
    }

    return result()

    function result() {
      return !(event.cancelable && event.defaultPrevented)
    }
  },

  addEventListener(type, handler, useCapture) {
    ({ type, useCapture } = normalizeEvent(type, useCapture))
    const eventListeners = getEventListeners(this, type)
    eventListeners.push({ target: this, handler, useCapture })
  },

  removeEventListener(type, handler, useCapture) {
    ({ type, useCapture } = normalizeEvent(type, useCapture))
    const eventListeners = getEventListeners(this, type)
    const index = eventListeners.findIndex(({ handler: h, useCapture: uc }) =>
      h === handler && uc === useCapture)
    if (index >= 0) eventListeners.splice(index, 1)
  }
}

Object.assign(HTMLElement.prototype, EventTarget)
Object.assign(Document.prototype, EventTarget)

module.exports = { Event, CustomEvent: Event }
