module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-fallthrough': 'error',
    'no-multiple-empty-lines': ['warn', { max: 1 }], // максимум 1 пустая строка подряд
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
  },
};
