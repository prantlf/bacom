import { events } from './comp'

export interface EventDecl {
  name?: string
  id?: string
  sel?: string
}

export function eventize(name: string): string {
  if (name.startsWith('on')) name = name.substr(2)
  return name.toLowerCase()
}

export function event({ name, id, sel }: EventDecl = {}): any {
  return (proto: Function, method: string): void => {
    const evts = proto[events] || (proto[events] = {})
    evts[method] = { name: name || eventize(method), id, sel }
  }
}
