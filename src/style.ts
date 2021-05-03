import memoize from './memoize'

export const constructibleStyleSheets = 'adoptedStyleSheets' in document

// Delays construction of a stylesheet. Returns a function that creates the stylesheet
// at first when it is called and remembers it to be returned in the next calls.
const style: (style: string) => () => CSSStyleSheet | HTMLStyleElement = constructibleStyleSheets
  ? (style: string) => memoize(() => {
    const stylesheet = new CSSStyleSheet();
    (stylesheet as any).replace(style)
    return stylesheet
  })
  : (style: string) => memoize(() => {
    const stylesheet = document.createElement('style')
    stylesheet.innerHTML = style
    return stylesheet
  })

export { style }
