export type Value = null | string | number | boolean
export type Result = void | string

export function attr(el: Element, name: string, value: Value): Result {
  if (value == null || value === false) el.removeAttribute(name)
  else el.setAttribute(name, value === true ? '' : String(value))
}

export function dasherize(name: string): string {
  return name.replace(/[A-Z](?:(?=[^A-Z])|[A-Z]*(?=[A-Z][^A-Z]|$))/g,
    (match, index) => index > 0 ? `-${match}` : match).toLowerCase()
}
