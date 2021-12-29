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
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.less$/,
        use: [          {
          loader: path.resolve('tools/less/webpack.js'),
          options: { minify, module: './dist/index.esm.js' }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: path.resolve('tools/sass/webpack.js'),
          options: { minify, module: './dist/index.esm.js' }
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: path.resolve('tools/style/webpack.js'),
          options: { minify, module: './dist/index.esm.js' }
        }]
      },
      {
        test: /\.t?html$/,
        use: [
        {
          loader: path.resolve('tools/templ/webpack.js'),
          options: { minify, module: './dist/index.esm.js' }
        }]
      }
    ]
  }
}
