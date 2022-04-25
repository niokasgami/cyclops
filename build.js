const esbuild = require('estrella');

const banner = `
/**
 * ==================================================================
 * Fable Maker Core - The core game engine developed by the creators of Fable Maker
 * 
 * Build Date: ${new Date().toLocaleString()}
 * 
 * Version: ${process.env.npm_package_version}
 * 
 * ==================================================================
*/
`


const common = {
  entry: './src/index.ts',
  bundle: true,
  banner: { js: banner },
  sourcemap: true,
  external: ['pixi.js', '@pixi/tilemap'],
}

esbuild.build({
  ...common,
  outfile: 'bundles/cyclops.esm.js',
  minify: false,
  format: 'esm',
})

esbuild.build({
  ...common,
  outfile: 'bundles/cyclops.cjs.js',
  minify: false,
  format: 'cjs',
  globalName: 'Cyclops',
})

esbuild.build({
  ...common,
  outfile: 'bundles/cyclops.js',
  minify: false,
  format: 'iife',
  globalName: 'Cyclops',
})
