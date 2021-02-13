module.exports = {
  extends: ['react-app', 'airbnb/base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    quotes: ['warn', 'single'],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-return-assign': 'off',
    'no-console': 'off',
    'arrow-body-style': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'additional-typescript-only-rule': 'warn',
      },
    },
  ],
  settings: {
    // https://stackoverflow.com/questions/42264007/eslint-errorring-importing-jsx-without-extension
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
};
