export type Parent = Element | ShadowRoot
export type Child = Element | DocumentFragment | string

export function empty(parent: Parent): void {
  let el: Node
  while ((el = parent.lastChild)) parent.removeChild(el)
}

export function render(parent: Parent, child: Child): void {
  empty(parent)
  if (typeof child === 'string') parent.innerHTML = child
  else parent.appendChild(child)
}
