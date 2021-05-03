import { constructibleStyleSheets } from './style'

export const children = Symbol('children')
export const events = Symbol('events')
export const created = Symbol('created')

export interface CustomElement extends HTMLElement {
  [created]: boolean
  [children]: { [key: string]: ElemDecl }
  [events]: { [key: string]: EventDecl }
  observedAttributes?: string[]
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void
}

declare type Style = HTMLStyleElement | CSSStyleSheet

export interface ElemDecl {
  id: string
  sel: string
}

export interface EventDecl {
  name: string
  id: string
  sel: string
}

export interface Comp {
  tag: string
  styles?: Array<() => Style>
  template?: () => HTMLTemplateElement
}

function appendClone(shadowRoot: ShadowRoot, el: HTMLElement | DocumentFragment): void {
  shadowRoot.appendChild(el.cloneNode(true))
}

function pickElements(childEls: { [key: string]: ElemDecl }, shadowRoot: ShadowRoot) {
  for (const name in childEls) {
    const { id, sel } = childEls[name]
    this[name] = id ? shadowRoot.getElementById(id) : shadowRoot.querySelector(sel)
  }
}

function startListening(events: { [key: string]: EventDecl }, shadowRoot: ShadowRoot) {
  for (const method in events) {
    const { name, id, sel } = events[method]
    const el = id ? shadowRoot.getElementById(id) : sel ? shadowRoot.querySelector(sel) : shadowRoot
    el.addEventListener(name, this[method].bind(this))
  }
}

export function comp({ tag, styles, template }: Comp): any {
  const styleCount = styles ? styles.length : 0
  let stylesheets: Style[]

  function applyStyle(shadowRoot: ShadowRoot): void {
    if (constructibleStyleSheets)
      (shadowRoot as any).adoptedStyleSheets = stylesheets ||
        (stylesheets = styles.map(style => style() as CSSStyleSheet))
    else
      for (const style of styles) appendClone(shadowRoot, style() as HTMLStyleElement)
  }

  return <T extends new(...args: any[]) => CustomElement>(ctor: T) => {
    class Comp extends ctor {
      constructor(...args: any[]) {
        super()
        this.attachShadow({ mode: 'open' })
        const shadowRoot = this.shadowRoot
        if (styleCount) applyStyle(shadowRoot)
        if (template) {
          appendClone(shadowRoot, template().content)
          pickElements.call(this, childEls, shadowRoot)
        }
        startListening.call(this, evts, shadowRoot)
        this[created] = true
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (oldValue !== newValue) (this as any)[name] = newValue;
        if (super.attributeChangedCallback) super.attributeChangedCallback(name, oldValue, newValue)
      }
    }

    const { prototype } = Comp
    const childEls = prototype[children] || (prototype[children] = {})
    const evts = prototype[events] || (prototype[events] = {})

    customElements.define(tag, Comp)

    return Comp
  }
}
