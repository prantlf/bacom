import { created, CustomElement } from './comp'
import { attr, dasherize } from './attr'

export type Type = 'boolean' | 'number' | 'string'
export type Value = boolean | number | string

export interface Prop {
  type: Type
}

const defaults = {
  boolean: false,
  number: 0,
  string: ''
}

type Converter = (value: any) => Value

const converters: { [key: string]: Converter } = {
  boolean(value: any): boolean {
    return value != null && value !== false
  },

  number(value: any): number {
    const number = Number(value)
    return isNaN(number) ? 0 : number
  },

  string(value: any): string {
    return value == null ? '' : String(value)
  }
}

type PropContainer = { [key in symbol]: Value }
type Prototype = { constructor: CustomElement }

export function prop({ type }: Prop): any {
  return (proto: Prototype, name: string): {} => {
    const propName = Symbol(name)
    const attrName = dasherize(name)

    const { constructor: ctor } = proto
    const observedAttrs = ctor.observedAttributes || (ctor.observedAttributes = [])
    observedAttrs.push(attrName)

    proto[propName] = defaults[type]

    const convert: Converter = converters[type];

    return {
      configurable: true,
      enumerable: true,

      get() {
        return (this as PropContainer)[propName]
      },

      set(value: any) {
        const oldValue = (this as PropContainer)[propName]
        const newValue = convert(value)
        if (oldValue !== newValue) {
          (this as PropContainer)[propName] = newValue
          if ((this as CustomElement)[created]) attr(this, attrName, value)
        }
      }
    }
  }
}
