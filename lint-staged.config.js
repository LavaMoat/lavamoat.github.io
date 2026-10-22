export default {
  '*.{mjs,js,ts}': [
    'eslint --fix',
    'prettier --write',
    'cspell lint --no-must-find-files',
  ],
  '*.md': ['markdownlint-cli2 --fix', 'cspell lint --no-must-find-files'],
  '*.{mdx,yml,yaml,json,astro}': [
    'prettier --write',
    'cspell lint --no-must-find-files',
  ],
  '!(package-lock*).json': ['prettier --write'],
  '*': () => 'npm run check',
};
