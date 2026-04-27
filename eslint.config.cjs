// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const pluginQuery = require('@tanstack/eslint-plugin-query')

const pluginJest = require('eslint-plugin-jest')
const testingLibrary = require('eslint-plugin-testing-library')

module.exports = defineConfig([
  expoConfig,
  ...pluginQuery.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  // Unit Testing files
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
