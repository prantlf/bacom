import { comp, prop, elem, event } from '../../dist'
import style from './counter.css'
import template from './counter.thtml'
import './counter-fonts'

@comp({ tag: 'test-counter', styles: [style], template })
export class CounterElement extends HTMLElement {
  @prop({ type: 'number' })
  public count = 0

  @elem()
  private display: HTMLElement

  private interval: NodeJS.Timeout

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
