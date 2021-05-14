module.exports = function cachify(cache, path, load) {
  let promise = cache.get(path)
  if (!promise) cache.set(path, promise = load())
  return promise
}
