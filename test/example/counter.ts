import { comp, prop, elem, event } from './dist/index.js'
import style1 from './counter.less'
import style2 from './counter.scss'
import style3 from './counter.css'
import template from './counter.thtml'
import './counter-fonts.ts'

@comp({ tag: 'test-counter', styles: [style1, style2, style3], template })
export class CounterElement extends HTMLElement {
  @prop({ type: 'number' })
  public count = 0

  @elem()
  private display: HTMLElement

  private interval: ReturnType<typeof setTimeout>

  connectedCallback(): void {
    this.start()
  }

  start(): void {
    if (!this.interval) this.interval = setInterval(() => {
      this.display.textContent = String(++this.count)
    }, 1000)
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }

  @event()
  onClick(): void {
    this.count = 0
  }
}
