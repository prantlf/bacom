const targets = ['less', 'sass', 'style', 'templ']
const plugins = ['esbuild', 'webpack']

export default targets.map(target => plugins.map(plugin => ({
  input: `tools/${target}/${plugin}.src.js`,
  output: {
    file: `tools/${target}/${plugin}.js`,
    format: 'cjs',
    exports: 'default',
    sourcemap: true
  },
  external: id => !/^\.{0,2}\//.test(id)
}))).flat()
