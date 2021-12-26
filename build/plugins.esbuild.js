const { build } = require('esbuild')

const makeAllPackagesExternal = {
  name: 'make-all-packages-external',
  setup(build) {
    const filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, ({ path }) => ({ path, external: true }))
  }
}

const targets = ['less', 'sass', 'style', 'templ']
const builds = targets.map(target => ({
  entryPoints: [`tools/${target}/esbuild.src.js`],
  outfile: `tools/${target}/esbuild.js`,
  format: 'cjs',
  platform: 'node',
  bundle: true,
  sourcemap: true,
  plugins: [makeAllPackagesExternal]
}))

Promise.all(builds.map(build)).catch(() => process.exitCode = 1)
