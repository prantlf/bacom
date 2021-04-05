const esbuild = require('@prantlf/esbuild')
const style = require('./style/esbuild')

const task = process.argv[2]
const watch = task === 'watch'
const builds = [
  {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    format: 'cjs',
    bundle: true
  }
]

if (task === 'dist' || watch)
  builds.push(
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.esm.js',
      format: 'esm',
      bundle: true
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.umd.js',
      format: 'umd',
      globalName: 'bacom'
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.umd.min.js',
      format: 'umd',
      globalName: 'bacom',
      bundle: true,
      minify: true
    }
  )

if (task === 'test' || watch)
  builds.push(
    {
      entryPoints: ['test/comp.test.ts'],
      outfile: 'test/comp.test.js',
      format: 'cjs'
    },
    {
      entryPoints: ['test/prop.test.ts'],
      outfile: 'test/prop.test.js',
      format: 'cjs'
    },
    {
      entryPoints: ['test/example/counter.tsx'],
      outfile: 'test/example/counter.js',
      format: 'esm',
      bundle: true,
      plugins: [style({ module: '../..' })]
    }
  )

Promise
  .all(builds.map(build => esbuild.build({ ...build, sourcemap: true, watch })))
  .catch(() => process.exit(1))
