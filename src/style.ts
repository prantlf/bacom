import memoize from './memoize'

export const constructibleStyleSheets = 'adoptedStyleSheets' in document

// Delays construction of a stylesheet. Returns a function that creates the stylesheet
// at first when it is called and remembers it to be returned in the next calls.
const style: (content: string) => () => CSSStyleSheet | HTMLStyleElement = constructibleStyleSheets
  ? (content: string) => memoize(() => {
    const stylesheet = new CSSStyleSheet();
    (stylesheet as any).replace(content)
    return stylesheet
  })
  : (content: string) => memoize(() => {
    const stylesheet = document.createElement('style')
    stylesheet.innerHTML = content
    return stylesheet
  })

export { style }
