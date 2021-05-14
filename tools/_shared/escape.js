module.exports = function escapeTaggedTemplate(source) {
  return source.replace(/\\/g, '\\\\').replace(/`/g, '\\`')
}
