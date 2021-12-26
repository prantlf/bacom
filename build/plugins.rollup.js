const targets = ['less', 'sass', 'style', 'templ']

export default targets.map(target => ({
  input: `tools/${target}/esbuild.src.js`,
  output: {
    file: `tools/${target}/esbuild.js`,
    format: 'cjs',
    exports: 'default',
    sourcemap: true
  },
  external: id => !/^\.{0,2}\//.test(id)
}))
