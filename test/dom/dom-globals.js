const { document, HTMLElement, Document, DocumentFragment } = require('dom-lite')
const { ShadowRoot } = require('./dom-shadow')

if (!process.env.NO_CONSTRUCTIBLE_STYLESHEETS) { // workaround
  Document.prototype.adoptedStyleSheets = []
  ShadowRoot.prototype.adoptedStyleSheets = []
}

const { customElements } = require('./dom-custom')
const { CSSStyleSheet } = require('./dom-stylesheet')
const { Event } = require('./dom-events')

const content = Symbol('content')
class HTMLTemplateElement extends HTMLElement {
  get content() {
    const content = document.createDocumentFragment()
    for (const child of this.childNodes) {
      content.appendChild(child.cloneNode(true))
    }
    return content
  }

  constructor() {
    super('template')
  }
}

HTMLElement.prototype.setAttributeNS = function (namespace, name, value) {
  this.setAttribute(name, value) // simplification for tests
}

Document.prototype.createElement = function(tag) {
  var Element = customElements.get(tag) ||
    (tag === 'template' ? HTMLTemplateElement : HTMLElement)
  var node = new Element(tag)
  node.ownerDocument = document
  return node
}

global.document = document
global.Element = HTMLElement
global.DocumentFragment = DocumentFragment
global.HTMLTemplateElement = HTMLTemplateElement
global.customElements = customElements
global.CSSStyleSheet = CSSStyleSheet
global.Event = Event

module.exports = {
  document, Element: HTMLElement, HTMLElement, DocumentFragment,
  HTMLTemplateElement, ShadowRoot, customElements, CSSStyleSheet, Event
}
