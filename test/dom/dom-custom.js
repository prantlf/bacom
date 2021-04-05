const registry = {}               // a map of { name: { ctor, promise } }
const resolve = Symbol('resolve') // help the resolve become private

// creates a promise that can be resolved outside of this method
function createPromise() {
  let localResolve
  const promise = new Promise(resolve => localResolve = resolve)
  promise[resolve] = localResolve // will be callable only in this file
  return promise
}

const customElements = {
  get(name) {
    const entry = registry[name.toLowerCase()]
    return entry && entry.ctor
  },

  define(name, ctor) {
    if (!name.includes('-')) throw new SyntaxError('not a valid custom element name')
    if (typeof ctor !== 'function') throw new TypeError('not a constructor')
    name = name.toLowerCase()
    const entry = registry[name] || (registry[name] = {})
    if (entry.ctor) throw new Error(`${name} already defined`)
    entry.ctor = ctor
    if (entry.promise) entry.promise[resolve](ctor) // if whenDefined was called
    else entry.promise = Promise.resolve(ctor)      // if just defined
  },

  whenDefined(name) {
    name = name.toLowerCase()
    const entry = registry[name] || (registry[name] = {})
    return entry.promise || (entry.promise = createPromise())
  }
}

module.exports = { customElements }
