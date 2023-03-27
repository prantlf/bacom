const { build } = require('esbuild')
const less = require('../../tools/less/esbuild.cjs')
const sass = require('../../tools/sass/esbuild.cjs')
const style = require('../../tools/style/esbuild.cjs')
const templ = require('../../tools/templ/esbuild.cjs')

const minify = true

build({
  entryPoints: ['test/example/counter.ts'],
  outfile: 'test/example/counter.js',
  format: 'esm',
  bundle: true,
  sourcemap: true,
  minify,
  plugins: [
    less({ minify, module: '../../dist/index.cjs' }),
    sass({ minify, module: '../../dist/index.cjs' }),
    style({ minify, module: '../../dist/index.cjs' }),
    templ({ minify, module: '../../dist/index.cjs' })
  ]
}).catch(() => process.exitCode = 1)
