# React Native Expo Starter

## Features

- Base on Expo
- Tailwindcss by [nativewind](https://www.nativewind.dev/v4/overview)
- i18n
- Dark theme
- Jest & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- authentication
  - sign in, sign up
  - process as guest
  - protect route and action
  - [Supabase](https://supabase.com/docs/guides/auth/quickstarts/react-native) - TBD

## How to update Expo and react-native

Update React Native rely on Expo, check the doc here: [Upgrade Expo SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)

1. `bun install expo@latest` or `bun install expo@next`
2. `bunx expo install --fix` (`bunx` = `npx`), or just `bunx expo install expo@^52.0.0 --fix`
3. check the [Changelog](https://github.com/expo/expo/blob/main/packages/expo/CHANGELOG.md)
4. Check for any possible known issues: `bunx expo-doctor@latest`

## Todo

- GitHub action

### E2E test

- [Maestro](https://docs.maestro.dev/getting-started/installing-maestro) TBD

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

- [React Native Testing Library (RNTL) Cookbook](https://callstack.github.io/react-native-testing-library/cookbook/index)

## Found issues

## General Guidelines

### Dep

install, prefer using this for install expo related:

```sh
bunx expo install react-native-webview
```

### Notes

- Using [https://docs.expo.dev/develop/development-builds/introduction/](https://docs.expo.dev/develop/development-builds/introduction/) `expo-dev-client` for production app
  - [Create a development build](https://docs.expo.dev/develop/development-builds/create-a-build/)
- Don't wrap your whole app in SafeAreaView, instead apply the styles to content inside your screens, from: [reactnavigation-summary](https://reactnavigation.org/docs/handling-safe-area/#summary)

## Used Libraries

- [sonner-native](https://gunnartorfis.github.io/sonner-native/) toast component for React Native.
- [lucide-react-native](https://lucide.dev/guide/packages/lucide-react-native)

### Animation

- [reanimated](https://github.com/software-mansion/react-native-reanimated/)
- [lottie](https://github.com/lottie-react-native/lottie-react-native)
  - [resource-lottiefiles](https://lottiefiles.com/)

### Resource

- [splash-screen](https://hotpot.ai/templates/splash-screen/10)

### UI components

build the UI components inspired by shadcn/ui, refer from:

- [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables) Universal shadcn/ui for React Native featuring a focused collection of components - Crafted with NativeWind v4 and accessibility in mind.
- [nativecn-ui](https://github.com/Mobilecn-UI/nativecn-ui)

#### Other choices

- [gluestack-ui](https://gluestack.io/) React & React Native Components & Patterns, seems good.
- style system and ui library [tamagui](https://tamagui.dev/)
- [react-native-ui-lib](https://github.com/wix/react-native-ui-lib)

## Chore

- install `ts-node` just to support read TypeScript **jest** configuration.

### Step by steps

1. `pnpm dlx create-expo-stack rn-expo-starter` for init commit, base on [create-expo-stack](https://github.com/roninoss/create-expo-stack).
2. Perfect project init setting
3. Check the commit
4. Utilize shadcn/ui theme and components

## local build

1. `npm install -g eas-cli`
2. `eas login`
3. config esa.json, refer: [eas.json](https://docs.expo.dev/eas/json)
4. eas build --platform android --profile preview --local

- `eas build --profile development-simulator --platform ios` build for ios simulator without expo go for canny expo sdk

## Refers

- [Ignite - the battle-tested React Native boilerplate](https://github.com/infinitered/ignite)
