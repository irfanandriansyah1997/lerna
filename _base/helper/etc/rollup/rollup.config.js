import typescript from '@rollup/plugin-typescript';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

export default {
  input: ['lib/**/*.ts'],
  output: {
    dir: 'build',
    format: 'cjs'
  },
  plugins: [multiInput(), terser(), typescript()]
};
