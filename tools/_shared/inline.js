function stringifyMap(map) {
  return Buffer.from(map.toString()).toString('base64')
}

module.exports = function inlineMap(map) {
  return `//# sourceMappingURL=data:application/json;base64,${stringifyMap(map)}`
}
