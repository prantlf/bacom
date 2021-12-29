const { build } = require('esbuild')
const less = require('../../tools/less/esbuild')
const sass = require('../../tools/sass/esbuild')
const style = require('../../tools/style/esbuild')
const templ = require('../../tools/templ/esbuild')

const minify = true

build({
  entryPoints: ['test/example/counter.ts'],
  outfile: 'test/example/counter.js',
  format: 'esm',
  bundle: true,
  sourcemap: true,
  minify,
  plugins: [
    less({ minify, module: '../../dist/index.esm.js' }),
    sass({ minify, module: '../../dist/index.esm.js' }),
    style({ minify, module: '../../dist/index.esm.js' }),
    templ({ minify, module: '../../dist/index.esm.js' })
  ]
}).catch(() => process.exitCode = 1)
