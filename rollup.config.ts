/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist/game.js',
    format: 'iife',
  },
  plugins: [
    typescript({ tsconfig: 'tsconfig.json' }),
    nodeResolve({
      preferBuiltins: true,
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
  ],
};
