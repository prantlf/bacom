const { startService } = require('@prantlf/esbuild')
const style = require('./style/esbuild')
const templ = require('./templ/esbuild')

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
      entryPoints: ['test/elem.test.ts'],
      outfile: 'test/elem.test.js',
      format: 'cjs'
    },
    {
      entryPoints: ['test/event.test.ts'],
      outfile: 'test/event.test.js',
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
      plugins: [style({ module: '../..' }), templ({ module: '../..' })]
    }
  )

let service
startService()
  .then(s => {
    service = s
    Promise .all(builds.map(build => service.build({ ...build, sourcemap: true, watch })))
  })
  .catch(() => process.exitCode = 1)
  .finally(() => service && service.stop())
