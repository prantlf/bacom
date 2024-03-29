const { build } = require('esbuild')

const makeAllPackagesExternal = {
  name: 'make-all-packages-external',
  setup(build) {
    const filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, ({ path }) => ({ path, external: true }))
  }
}

const targets = ['less', 'sass', 'style', 'templ']
const plugins = ['esbuild', 'rollup', 'webpack']
const builds = targets.map(target => plugins.map(plugin => ({
  entryPoints: [`tools/${target}/${plugin}.js`],
  outfile: `tools/${target}/${plugin}.cjs`,
  format: 'cjs',
  platform: 'node',
  bundle: true,
  sourcemap: true,
  plugins: [makeAllPackagesExternal]
}))).flat()

Promise.all(builds.map(build)).catch(() => process.exitCode = 1)
