const path = require('path')

const mode = 'production'
const minify = mode === 'production'

module.exports = {
  entry: './test/example/counter.ts',
  output: {
    filename: 'counter.js',
    path: path.resolve(__dirname),
    module: true,
    library: { type: 'module' }
  },
  mode,
  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
  experiments: { outputModule: true },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
          // workaround for a wrong inferred type of loader output
          options: { transpileOnly: true }
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: path.resolve('tools/less/webpack.cjs'),
          options: { minify, module: './dist/index.cjs' }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: path.resolve('tools/sass/webpack.cjs'),
          options: { minify, module: './dist/index.cjs' }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: path.resolve('tools/style/webpack.cjs'),
          options: { minify, module: './dist/index.cjs' }
        }]
      },
      {
        test: /\.t?html$/,
        use: [{
          loader: path.resolve('tools/templ/webpack.cjs'),
          options: { minify, module: './dist/index.cjs' }
        }]
      }
    ]
  }
}
