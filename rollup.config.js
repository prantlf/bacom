import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist3/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist3/index.esm.js',
        format: 'esm',
        sourcemap: true
      },
      {
        file: 'dist3/index.umd.js',
        format: 'umd',
        name: 'bacom',
        sourcemap: true
      },
      {
        file: 'dist3/index.umd.min.js',
        format: 'umd',
        name: 'bacom',
        sourcemap: true,
        plugins: [terser()]
      },
      {
        dir: 'dist3',
        sourcemap: true
      }
    ],
    plugins: [typescript({
      declaration: true,
      declarationDir: 'dist3',
      rootDir: '.'
    })]
  }
]
