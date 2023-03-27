const { spawn } = require('child_process')
const { startService } = require('@prantlf/esbuild')
const less = require('../tools/less/esbuild.cjs')
const sass = require('../tools/sass/esbuild.cjs')
const style = require('../tools/style/esbuild.cjs')
const templ = require('../tools/templ/esbuild.cjs')

const task = process.argv[2]
const prepare = task === 'prepare'
const watch = task === 'watch'
const builds = []
const bundle = true
const minify = true

if (prepare || task === 'dist' || watch)
  builds.push(
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.cjs',
      format: 'cjs',
      bundle
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.js',
      format: 'esm',
      bundle
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.esm.min.js',
      format: 'esm',
      bundle,
      minify
    },
    {
      entryPoints: ['src/index.ts'],
      outfile: 'dist/index.umd.min.js',
      format: 'umd',
      globalName: 'bacom',
      bundle,
      minify
    }
  )

if (task === 'test' || watch)
  builds.push(
    {
      entryPoints: ['test/comp.test.ts'],
      outfile: 'test/comp.test.cjs',
      format: 'cjs'
    },
    {
      entryPoints: ['test/elem.test.ts'],
      outfile: 'test/elem.test.cjs',
      format: 'cjs'
    },
    {
      entryPoints: ['test/event.test.ts'],
      outfile: 'test/event.test.cjs',
      format: 'cjs'
    },
    {
      entryPoints: ['test/prop.test.ts'],
      outfile: 'test/prop.test.cjs',
      format: 'cjs'
    },
    {
      entryPoints: ['test/example/counter.ts'],
      outfile: 'test/example/counter.js',
      format: 'esm',
      bundle,
      minify,
      plugins: [
        less({ minify, module: '../..' }),
        sass({ minify, module: '../..' }),
        style({ minify, module: '../..' }),
        templ({ minify, module: '../..' })
      ]
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

function types() {
  return run (`${__dirname}/types`)
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args)
      .on('error', err => (console.error(err), reject()))
      .on('exit', code => code ? reject() : resolve())
    proc.stdout.on('data', data => process.stdout.write(data.toString()))
    proc.stderr.on('data', data => process.stderr.write(data.toString()))
  })
}

Promise.all([build(), prepare && types()]).catch(() => process.exitCode = 1)
