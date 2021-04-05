const contentProp = Symbol('content')

class CSSStyleSheet {
  async replace(content) {
    this[contentProp] = content
    return Promise.resolve()
  }

  replaceSync(content) {
    this[contentProp] = content
  }

  toString() {
    return this[contentProp] || ''
  }
}

module.exports = { CSSStyleSheet }
