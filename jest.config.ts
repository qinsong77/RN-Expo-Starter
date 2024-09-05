/*
  https://docs.expo.dev/develop/unit-testing/
 */
export default {
  preset: 'jest-expo',
  // covered in preset
  // transformIgnorePatterns: [
  //   'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  // ],
  moduleNameMapper: {
    '^expo-secure-store$': '<rootDir>/scripts/jest_mock/expo-secure-store',
  },
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
