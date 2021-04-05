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
}

HTMLElement.prototype.attachShadow = function({ mode }) {
  this.shadowRoot = new ShadowRoot(mode)
  this.shadowRoot.ownerDocument = this.ownerDocument
}

module.exports = { ShadowRoot }
