export default {
  '*.(m?js|ts)': [
    'eslint --fix',
    'prettier --write',
    'cspell lint --no-must-find-files',
  ],
  '*.md': ['markdownlint-cli2 --fix', 'cspell lint --no-must-find-files'],
  '*.(mdx?|ya?ml|json|astro)': [
    'prettier --write',
    'cspell lint --no-must-find-files',
  ],
  '!(package-lock*).json': ['prettier --write'],
  '*': () => 'npm run check',
};
