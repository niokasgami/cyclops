const esbuild = require('esbuild')

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require('esbuild-node-externals')

const isProduction = process.env.NODE_ENV === 'production'

esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: 'dist/cyclops.js',
  bundle: true,
  minify: isProduction,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
  plugins: [nodeExternalsPlugin()]
}).catch(() => process.exit(1))
