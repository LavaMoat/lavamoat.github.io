// @ts-check

// @ts-expect-error - no types
import pluginJs from '@eslint/js';
import astro from 'eslint-plugin-astro';
import jsonc from 'eslint-plugin-jsonc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...astro.configs['flat/recommended'],
  ...jsonc.configs['flat/prettier'],
  ...tseslint.configs.recommended,
  {
    ignores: ['.astro/**/*', '**/env.d.ts', 'dist/**'],
  },
];
