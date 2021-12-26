function stringifyMap(map) {
  return Buffer.from(map.toString()).toString('base64')
}

export default function inlineMap(map) {
  return `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${stringifyMap(map)}`
}
