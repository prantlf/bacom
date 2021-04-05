import { constructibleStyleSheets } from './style'
import { empty } from './render'

export const created = Symbol('created')
const updating = Symbol('updating')

export interface CustomElement extends HTMLElement {
  [created]: boolean
  [updating]?: Promise<void>
  observedAttributes?: string[]
  connectedCallback?(): void
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void
  render?(): Element | DocumentFragment
  updateComplete: Promise<void>
  requestUpdate(): Promise<void>
}

export interface Comp {
  tag: string,
  styles?: Array<() => HTMLElement | CSSStyleSheet>
}

export function comp({ tag, styles }: Comp): any {
  const styleCount = styles ? styles.length : 0
  let stylesheets: (CSSStyleSheet | HTMLElement)[]

  function applyStyle(shadowRoot: ShadowRoot): void {
    if (constructibleStyleSheets)
      (shadowRoot as any).adoptedStyleSheets = stylesheets ||
        (stylesheets = styles.map(style => style() as CSSStyleSheet))
    else
      for (const style of styles)
        shadowRoot.appendChild((style() as HTMLElement).cloneNode(true))
  }

  function clearContent(shadowRoot: ShadowRoot): void {
    if (constructibleStyleSheets) {
      empty(shadowRoot)
    } else {
      for (let cnt = shadowRoot.childNodes.length - styleCount; cnt; --cnt)
        shadowRoot.removeChild(shadowRoot.lastChild)
    }
  }

  function updateContent(shadowRoot: ShadowRoot, el: Element | DocumentFragment): void {
    clearContent(shadowRoot)
    shadowRoot.appendChild(el)
  }

  return <T extends new(...args: any[]) => CustomElement>(ctor: T) => {
    class Comp extends ctor {
      constructor(...args: any[]) {
        super()
        this.attachShadow({ mode: 'open' });
        this[created] = true
      }

      connectedCallback(): void {
        if (styleCount) applyStyle(this.shadowRoot)
        this.requestUpdate()
        if (super.connectedCallback) super.connectedCallback()
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (oldValue !== newValue) (this as any)[name] = newValue;
        if (super.attributeChangedCallback) super.attributeChangedCallback(name, oldValue, newValue)
      }

      get updateComplete(): Promise<void> {
        return this[updating] || Promise.resolve()
      }

      requestUpdate(): Promise<void> {
        if (!super.render) return
        let promise = this[updating]
        if (!promise)
          promise = this[updating] = Promise.resolve().then(() => {
            this[updating] = undefined
            updateContent(this.shadowRoot, super.render())
          })
        return promise
      }
    }

    customElements.define(tag, Comp)

    return Comp
  }
}
