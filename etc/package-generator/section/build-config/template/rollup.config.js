import typescript from '@rollup/plugin-typescript';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

export default {
  input: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.spec.ts',
    '!src/**/*.spec.tsx'
  ],
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [multiInput(), terser(), typescript()]
};
