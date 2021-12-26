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
    less({ minify, module: '../..' }),
    sass({ minify, module: '../..' }),
    style({ minify, module: '../..' }),
    templ({ minify, module: '../..' })
  ]
}).catch(() => process.exitCode = 1)
