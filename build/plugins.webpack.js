const path = require('path')
const nodeExternals = require('webpack-node-externals')

const targets = ['less', 'sass', 'style', 'templ']
const plugins = ['esbuild', 'webpack']

module.exports = targets.map(target => plugins.map(plugin => ({
  entry: `./tools/${target}/${plugin}.src.js`,
  output: {
    filename: `${plugin}.js`,
    path: path.resolve(__dirname, `tools/${target}`),
    library: { type: 'commonjs' }
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  mode: 'production',
  devtool: 'source-map',
}))).flat()
