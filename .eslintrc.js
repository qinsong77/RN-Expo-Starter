module.exports = {
  extends: ['universe/native'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^expo', '^react'], ['^@?\\w'], ['@/(.*)'], ['^[./]']], // sort order for imports
      },
    ],
    'import/order': ['off'], // keeping default rule off and replaced with simple import sort
    'import/newline-after-import': ['error', { count: 1 }], // new line after all the imports
    'padding-line-between-statements': [
      // blank line between statements
      'error',
      { blankLine: 'always', prev: ['export', 'function'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['export', 'function'] },
    ],
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/recommended', 'plugin:testing-library/react'],
      rules: { 'jest/prefer-expect-assertions': 'off' },
    },
  ],
}
