import memoize from './memoize'

// Delays construction of a stylesheet. Returns a function that creates the stylesheet
// at first when it is called and remembers it to be returned in the next calls.
const style: (content: string) => () => CSSStyleSheet =
  (content: string) => memoize(() => {
    const stylesheet = new CSSStyleSheet();
    (stylesheet as any).replace(content)
    return stylesheet
  })

export { style }
