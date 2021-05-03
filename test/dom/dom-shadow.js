const { document, HTMLElement } = require('dom-lite')

const { constructor: DocumentFragment } =
  Object.getPrototypeOf(document.createDocumentFragment())

class ShadowRoot extends DocumentFragment {
  nodeName = '#shadow-root'
  localName = '#shadow-root'

  constructor(mode) {
    super()
    this.mode = mode
  }

  getElementById(id) {
    for (const child of this.childNodes) {
      if (child instanceof HTMLElement) {
        if (child.id === id) return child
        const el = child.getElementById(id)
        if (el) return el
      }
    }
  }

  querySelector(sel) {
    for (const child of this.childNodes) {
      if (child instanceof HTMLElement) {
        if (child.id === sel.slice(1)) return child // support local tests
        const el = child.querySelector(sel)
        if (el) return el
      }
    }
  }
}

HTMLElement.prototype.attachShadow = function({ mode }) {
  this.shadowRoot = new ShadowRoot(mode)
  this.shadowRoot.ownerDocument = this.ownerDocument
}

module.exports = { ShadowRoot }
