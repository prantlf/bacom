import { comp, prop } from '../../dist'
import { createEl } from 'janadom'
import style from './counter.css'
import './counter-fonts'

@comp({ tag: 'test-counter', styles: [style] })
export class CounterElement extends HTMLElement {
  @prop({ type: 'number' })
  public count = 0

  private interval

  connectedCallback(): void {
    this.start()
  }

  render(): HTMLElement {
    return <span>Count: { this.count }</span>
  }

  start() {
    if (!this.interval) this.interval = setInterval(() => ++this.count, 1000)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
    }
  }
}
