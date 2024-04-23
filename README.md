# React-Native Expo Starter

## Features

- Tailwindcss by [nativewind](https://www.nativewind.dev/v4/overview)
- i18n
- Dark theme
- Jest & [React Native Testing Librar](https://callstack.github.io/react-native-testing-library/)

## Step by steps

1. `pnpm dlx create-expo-stack rn-expo-starter` for init commit
2. perfect project init setting
3. check the commit
4. Shadcn/ui theme and components

## Other choices

- style system and ui library [tamagui](https://tamagui.dev/)

## Chore

- install `ts-node` just to support read TypeScript **jest** configuration.

## todo

## E2E test

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
