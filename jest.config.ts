/*
  https://docs.expo.dev/develop/unit-testing/
 */
export default {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    // '**/*.{js,jsx}',
    // '!**/coverage/**',
    // '!**/node_modules/**',
    // '!**/babel.config.js',
    // '!**/jest.setup.js',
    'components/**/*.{js,jsx,ts,tsx}',
    'features/**/*.{js,jsx,ts,tsx}',
    'core/**/*.{js,jsx,ts,tsx}',
  ],
}
