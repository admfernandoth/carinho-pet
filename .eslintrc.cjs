module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {},
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.config.js', '*.config.cjs'],
};