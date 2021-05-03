import { children } from './comp'
import { dasherize } from './attr'

export interface Elem {
  id?: string
  sel?: string
}

export function elem({ id, sel }: Elem = {}): any {
  return (proto: Function, name: string): void => {
    if (!(id || sel)) id = `${dasherize(name)}`
    const childEls = proto[children] || (proto[children] = {})
    childEls[name] = { id, sel }
  }
}
