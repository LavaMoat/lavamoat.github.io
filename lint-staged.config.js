export default {
  '*.(m?js|ts)': ['eslint --fix', 'prettier --write'],
  '*.md': ['markdownlint-cli2 --fix'],
  '*.(mdx?|ya?ml|json|astro)': ['prettier --write'],
  '!(package-lock*).json': ['prettier --write'],
  '*': () => 'npm run check',
};
