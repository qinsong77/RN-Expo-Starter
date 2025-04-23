const { defineConfig, globalIgnores } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const pluginJest = require('eslint-plugin-jest')
const testingLibrary = require('eslint-plugin-testing-library')

module.exports = defineConfig([
  globalIgnores([
    'dist/*',
    'build/*',
    'coverage/*',
    '.husky/*',
    '.idea/*',
    '.vscode/*',
    '.expo/*',
    'expo-env.d.ts',
  ]),
  expoConfig,
  prettierRecommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^expo', '^react'], ['^@?\\w'], ['@/(.*)'], ['^[./]']],
        },
      ],
      'import/order': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['export', 'function'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['export', 'function'] },
      ],
      'react/no-unescaped-entities': 'off',
    },
  },

  // Test overrides
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      jest: pluginJest,
      'testing-library': testingLibrary,
    },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      'jest/prefer-expect-assertions': 'off',
      ...testingLibrary.configs.react.rules,
    },
  },
])
