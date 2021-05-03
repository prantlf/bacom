import memoize from './memoize'

const templ: (content: string) => () => HTMLTemplateElement =
  (content: string) => memoize(() => {
    const templ = document.createElement('template')
    templ.innerHTML = content
    return templ
  })

export { templ }
