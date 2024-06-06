# React-Native Expo Starter

## Features

- Tailwindcss by [nativewind](https://www.nativewind.dev/v4/overview)
- i18n
- Dark theme
- Jest & [React Native Testing Librar](https://callstack.github.io/react-native-testing-library/)

## Step by steps

1. `pnpm dlx create-expo-stack rn-expo-starter` for init commit
2. Perfect project init setting
3. Check the commit
4. Utilize Shadcn/ui theme and components

## How to update Expo and react-native

react-native rely on Expo, check the doc here: [Upgrade Expo SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)

1. `bun install expo@latest` or `bun install expo@next`
2. `bunx expo install --fix` `bunx` = `npx`
3. check the [Changelog](https://github.com/expo/expo/blob/main/packages/expo/CHANGELOG.md)
4. Check for any possible known issues: `bunx expo-doctor@latest`

## Other choices

- style system and ui library [tamagui](https://tamagui.dev/)
- [react-native-ui-lib](https://github.com/wix/react-native-ui-lib)

## Chore

- install `ts-node` just to support read TypeScript **jest** configuration.

## todo

### E2E test

### test provider & mock

eg:

```ts
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
```
