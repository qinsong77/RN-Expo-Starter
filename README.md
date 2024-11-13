# React-Native Expo Starter

## Features

- Tailwindcss by [nativewind](https://www.nativewind.dev/v4/overview)
- i18n
- Dark theme
- Jest & [React Native Testing Librar](https://callstack.github.io/react-native-testing-library/)
- authentication
  - sign in, sign up
  - process as guest
  - protect route and action
  - [Supabase](https://supabase.com/docs/guides/auth/quickstarts/react-native) - TBD

## Step by steps

1. `pnpm dlx create-expo-stack rn-expo-starter` for init commit, base on [create-expo-stack](https://github.com/roninoss/create-expo-stack).
2. Perfect project init setting
3. Check the commit
4. Utilize shadcn/ui theme and components

## How to update Expo and react-native

react-native rely on Expo, check the doc here: [Upgrade Expo SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)

1. `bun install expo@latest` or `bun install expo@next`
2. `bunx expo install --fix` (`bunx` = `npx`)
3. check the [Changelog](https://github.com/expo/expo/blob/main/packages/expo/CHANGELOG.md)
4. Check for any possible known issues: `bunx expo-doctor@latest`

## Other choices

- style system and ui library [tamagui](https://tamagui.dev/)
- [react-native-ui-lib](https://github.com/wix/react-native-ui-lib)

## General Guidelines

### Dep

install, prefer using:

```sh
bunx expo install react-native-webview
```

### 动画

- [reanimated](https://github.com/software-mansion/react-native-reanimated/)
- [lottie](https://github.com/lottie-react-native/lottie-react-native)
  - [resource-lottiefiles](https://lottiefiles.com/)

### Resource

- [splash-screen](https://hotpot.ai/templates/splash-screen/10)

### UI components

build the UI components inspired by shadcn/ui, refer from:

- [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables) Universal shadcn/ui for React Native featuring a focused collection of components - Crafted with NativeWind v4 and accessibility in mind.
- [nativecn-ui](https://github.com/Mobilecn-UI/nativecn-ui)

### Notes

- Don't wrap your whole app in SafeAreaView, instead apply the styles to content inside your screens, from: [reactnavigation-summary](https://reactnavigation.org/docs/handling-safe-area/#summary)

## Chore

- install `ts-node` just to support read TypeScript **jest** configuration.

## todo

- useProtectedAction test failed
- Github action

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

## Found issues

`sonner.web.ts` 报错，Metro error: While trying to resolve module `sonner`, this package itself specifies a `main` module field that could not be resolved (`/Users/notend/GitHubProject/focus-gold/node_modules/sonner/index`...

手动修改sonner node_module中解决`package.json`解决：

```json
{
  "main": "./dist/index.js"
}
```

## Used Library

- [sonner-native](https://gunnartorfis.github.io/sonner-native/) toast component for React Native.
- [lucide-react-native](https://lucide.dev/guide/packages/lucide-react-native)

## local build

1. `npm install -g eas-cli`
2. `eas login`
3. config esa.json, refer: [eas.json](https://docs.expo.dev/eas/json)
4. eas build --platform android --profile preview --local

- `eas build --profile development-simulator --platform ios` build for ios simulator without expo go for canny expo sdk
