module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: true, trailingComma: 'es5', endOfLine: 'auto' },
    ],
  },
};
