import { minify } from 'rollup-plugin-swc-minify'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'
import less from '../../tools/less/rollup.js'
import sass from '../../tools/sass/rollup.js'
import style from '../../tools/style/rollup.js'
import templ from '../../tools/templ/rollup.js'

export default {
  input: 'test/example/counter.ts',
  output: {
    file: 'test/example/counter.js',
    sourcemap: true
  },
  plugins: [
    less({ minify, module: '../../dist/index.js' }),
    sass({ minify, module: '../../dist/index.js' }),
    style({ minify, module: '../../dist/index.js' }),
    templ({ minify, module: '../../dist/index.js' }),
    typescript(), sourcemaps(), minify()
  ]
}
