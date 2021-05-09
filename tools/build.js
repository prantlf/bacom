const { spawn } = require('child_process')
const { startService } = require('@prantlf/esbuild')
const style = require('./style/esbuild')
const templ = require('./templ/esbuild')

const task = process.argv[2]
const prepare = task === 'prepare'
const watch = task === 'watch'
const builds = [
  {
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    format: 'cjs',
    bundle: true
  }
]

if (prepare || task === 'dist' || watch)
  builds.push(
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.esm.js',
      format: 'esm',
      bundle: true
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.esm.min.js',
      format: 'esm',
      bundle: true,
      minify: true
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
      entryPoints: ['test/example/counter.ts'],
      outfile: 'test/example/counter.js',
      format: 'esm',
      bundle: true,
      plugins: [style({ module: '../..' }), templ({ module: '../..' })]
    }
  )

async function build() {
  const service = await startService()
  try {
    await Promise.all(builds.map(build => service.build({ ...build, sourcemap: true, watch })))
  } finally {
    service.stop()
  }
}

function typings() {
  return new Promise((resolve, reject) => {
    const proc = spawn(`${__dirname}/typings`)
      .on('error', err => (console.error(err), reject()))
      .on('exit', code => code ? reject() : resolve())
    proc.stdout.on('data', data => process.stdout.write(data.toString()))
    proc.stderr.on('data', data => process.stderr.write(data.toString()))
  })
}

Promise.all([build(), prepare && typings()]).catch(() => process.exitCode = 1)
