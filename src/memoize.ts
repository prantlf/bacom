// Delays computing the result of a function. Returns a function that calls the
// specified callback at first when it is called and remembers its result to be
// returned in the next calls.
export default function memoize<T>(func: () => T): () => T {
  let value: T
  return () => value || (value = func())
}
