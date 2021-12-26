import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import sourcemaps from 'rollup-plugin-sourcemaps'
import less from '../../tools/less/rollup'
import sass from '../../tools/sass/rollup'
import style from '../../tools/style/rollup'
import templ from '../../tools/templ/rollup'

const minify = true

export default {
  input: 'test/example/counter.ts',
  output: {
    file: 'test/example/counter.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    less({ minify, module: '../../dist/index.esm.js' }),
    sass({ minify, module: '../../dist/index.esm.js' }),
    style({ minify, module: '../../dist/index.esm.js' }),
    templ({ minify, module: '../../dist/index.esm.js' }),
    typescript(), sourcemaps(), minify && terser({ output: { comments: false } })
  ]
}
