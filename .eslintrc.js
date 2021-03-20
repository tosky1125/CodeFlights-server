module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [ '.ts', 'js' ]
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': ['warn', {'prefixWithI': 'always'}],
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
  }
};
