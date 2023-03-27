const targets = ['less', 'sass', 'style', 'templ']
const plugins = ['esbuild', 'rollup', 'webpack']

export default targets.map(target => plugins.map(plugin => ({
  input: `tools/${target}/${plugin}.js`,
  output: {
    file: `tools/${target}/${plugin}.cjs`,
    format: 'cjs',
    exports: 'default',
    sourcemap: true
  },
  external: id => !/^\.{0,2}\//.test(id)
}))).flat()
