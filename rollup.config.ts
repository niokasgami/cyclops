/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import uglify from '@lopatnov/rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

const commonPlugins = [
  typescript({ tsconfig: 'tsconfig.json' }),
  nodeResolve({
    preferBuiltins: true,
    extensions: ['.js', '.ts'],
  }),
  commonjs(),
];

const prodPlugins = [
  ...commonPlugins,
  uglify(),
];

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/game.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: isProduction ? prodPlugins : commonPlugins,
};
