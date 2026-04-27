# React Native Expo Starter

## Server

For server, refer: [cloudflare-workers-d1-hono-drizzle-better-auth-template](https://github.com/qinsong77/cloudflare-workers-d1-hono-drizzle-better-auth-template)

See [Hono RPC Type Sharing](#hono-rpc-type-sharing) for how backend types are shared with this project.

## Previous setups

### Starter 1.0

Based on [Starter 1.0](https://github.com/qinsong77/RN-Expo-Starter/tree/1.0.0), with:

- Tailwindcss by [nativewind](https://www.nativewind.dev/v4/overview)
- Authentication
- i18n with i18next
- Universal shadcn/ui for React Native with [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables)
- etc...

### Gluestack v3, better-auth

Based on [gluestack-better-auth](https://github.com/qinsong77/RN-Expo-Starter/tree/gluestack-better-auth), with:

- UI: [gluestack v2](https://gluestack.io/ui/docs/home/overview/introduction)
- Auth: [better-auth](https://www.better-auth.com/docs/integrations/expo)

## Features

- Based on Expo
- Tailwindcss by [uniwind](https://docs.uniwind.dev/)
- Shadcn/ui by [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables)
- Dark theme and theme constants
- i18n by [lingui](https://lingui.dev/introduction)
- Hono RPC and React Query
- Authentication by [better-auth](https://www.better-auth.com/docs/integrations/expo)
  - sign in, sign up, sign out, anonymous mode
  - process as guest
  - protect route and action
- Jest & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- Tooling: eslint, prettier, commitlint, husky, lint-staged, etc.

### Used Libraries

- [sonner-native](https://gunnartorfis.github.io/sonner-native/) toast component for React Native.
- [lucide-react-native](https://lucide.dev/guide/packages/lucide-react-native)
- [react-native-logs](https://github.com/mowispace/react-native-logs)

## How to update Expo and React Native

Updating React Native is tied to the Expo SDK; see [Upgrade Expo SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/).

1. `bun install expo@latest` or `bun install expo@next`
2. `bunx expo install --fix` (`bunx` = `npx`), or just `bunx expo install expo@^52.0.0 --fix`
3. check the [Changelog](https://github.com/expo/expo/blob/main/packages/expo/CHANGELOG.md)
4. Check for any possible known issues: `bunx expo-doctor@latest`

## AI

### Skills

- [Expo Skills for AI agents](https://docs.expo.dev/skills/)
- [vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills)
  - react-best-practices
  - composition-patterns
- [uniwind](https://docs.uniwind.dev/): docs for LLMs / MCP (see site)

## Todo

- [ ] GitHub action
- [x] Integrate with [lingui](https://lingui.dev/introduction) for i18n

### E2E test

- [Maestro](https://docs.maestro.dev/getting-started/installing-maestro) TBD
- [Detox](https://github.com/wix/Detox)

### Test provider & mock

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

## Found Resources

These are the resources that I found useful and want to share with you.

### UI components

- [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables) Universal shadcn/ui for React Native (upstream docs often mention NativeWind v4; this starter uses uniwind).
- [gluestack-ui](https://gluestack.io/) React & React Native Components & Patterns, seems good.
- [heroui-native](https://github.com/heroui-inc/heroui-native)
- [tamagui](https://tamagui.dev/) style system and ui library
- [react-native-ui-lib](https://github.com/wix/react-native-ui-lib)
- [Expo UI](https://docs.expo.dev/versions/latest/sdk/ui/)

### Tailwindcss native

- [nativewind](https://www.nativewind.dev/v4/overview)
- [uniwind](https://docs.uniwind.dev/)

### Animation

- [reanimated](https://github.com/software-mansion/react-native-reanimated/)
- [lottie](https://github.com/lottie-react-native/lottie-react-native)
  - [resource-lottiefiles](https://lottiefiles.com/)

### Libraries

- [react-native-streamdown](https://github.com/software-mansion-labs/react-native-streamdown) Markdown streaming for React Native
- [boneyard](https://boneyard.vercel.app/react-native) skeleton screens. Automatically generated.
- [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) The most complete chat UI for React Native

### Others

- [splash-screen](https://hotpot.ai/templates/splash-screen/10)
- [rn-better-dev-tools](https://github.com/LovesWorking/rn-better-dev-tools) Enhanced developer tools for React Native applications, supporting React Query DevTools and device storage monitoring with a beautiful native interface.

#### Authentication

- [Better Auth Expo Integration](https://www.better-auth.com/docs/integrations/expo)
- [Authentication in Expo Router](https://docs.expo.dev/router/advanced/authentication/) Haven't following, but can take a reference if needed

## Found issues

## General Guidelines

### Dep

Install, prefer using this for installing Expo-related packages:

```sh
bunx expo install react-native-webview
```

### Internationalization & Lingui Guide

#### File structure

```
locales/
├── en/
│   ├── messages.po      # English source file
│   └── messages.ts      # Compiled file
├── zh/
│   ├── messages.po      # Chinese source file
│   └── messages.ts      # Compiled file

core/i18n/
├── lingui.tsx           # Lingui configuration and utility functions

lingui.config.ts         # Lingui configuration file
```

#### Usage ways example

##### basic usage

Using `Trans` to translate the screen heading:

```tsx
import { Trans } from '@lingui/react/macro'
import { Text } from 'react-native'

function SomeComponent() {
  return (
    <Text style={styles.heading}>
      <Trans>Message Inbox</Trans>
    </Text>
  )
}
```

For props, use the `t` macro which we can obtain from the `useLingui` hook, e.g.:

```tsx
import { useLingui } from '@lingui/react/macro'

function SomeComponent() {
  const { t } = useLingui()

  return (
    <View>
      <Button
        title={t`this will be translated and rerendered with locale changes`}
      />
    </View>
  )
}
```

**Note**: `import { useLingui } from '@lingui/react'` is runtime, returns `{ i18n, _, defaultComponent }`
`import { useLingui } from '@lingui/react/macro'` is compile time, return `{ t }`, most time we use this one. See [useLingui](https://lingui.dev/ref/react#uselingui) for more details.

##### Internationalization Outside of React

Using `i18n` object and the `msg` macro as follows:

```tsx
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { Alert } from 'react-native'

const deleteTitle = msg`Are you sure to delete this?`
const showDeleteConfirmation = () => {
  Alert.alert(i18n._(deleteTitle))
}
```

##### Dates and Numbers

Use `i18n.date()` to format dates, or `i18n.number()` to format numbers.

```tsx
import { Trans, useLingui } from '@lingui/react/macro'

export default function Inbox() {
  const { i18n } = useLingui()

  return (
    <View>
      <Text>
        <Trans>Last login on {i18n.date(lastLogin)}.</Trans>
      </Text>
    </View>
  )
}
```

##### MessageFormat

The following is allowed:

```tsx
<p>
   <Trans>
      See all <a href="/unread">unread messages</a>
      {" or "}
      <a onClick={markAsRead}>mark them</a> as read.
   </Trans>
</p>
// above will be :
// msgid "See all <0>unread messages</0> or <1>mark them</1> as read."
// msgstr ""
// ----
// Any expressions are allowed, not just simple variables.
<Trans>Hello {user.name}</Trans>
<Trans>The random number is {Math.rand()}</Trans>
<Trans>
   Read <a href="/more">more</a>.
</Trans>
```

#### Development workflow

##### 1. Add new internationalized text

1. Wrap text with `` t`...` ``, `<Trans>...</Trans>`, or `` msg`...` `` macros (see examples above)
2. Run the extraction command: `bun run i18n:extract`
3. Edit the generated PO file, add translations
4. Run the compilation command: `bun run i18n:compile`

##### 2. Available commands

```bash
# Extract the text that needs to be internationalized
bun run i18n:extract

# Compile the message file
bun run i18n:compile

# Clean and recompile
bun run i18n:clean
```

#### References

- [React Apps Internationalization](https://lingui.dev/tutorials/react)
- [React Native Apps Internationalization](https://lingui.dev/tutorials/react-native)

### Logger

Logging uses [react-native-logs](https://github.com/mowispace/react-native-logs). The app-wide instance lives in `core/logger.ts` (colored `consoleTransport`, time-stamped output).

- **Import**: Prefer `createLog('namespace')` at module scope (e.g. `const log = createLog('rpc')`) so messages show a short label in the console. Use the exported `log` only when a single global logger is enough.
- **Levels** (lowest to highest): `debug` → `info` → `warn` → `error`. In **production** release builds, minimum severity is `info` (`__DEV__` is false), so `log.debug` does not run—put noisy or detailed traces behind `debug` only.
- **Do not** log secrets, tokens, or full PII. For more sinks (file, remote), add a [custom transport](https://github.com/mowispace/react-native-logs#custom-transport) in `core/logger.ts` and keep the same `createLog` / `log` API.

### Notes

- When you need native code beyond Expo Go, use [development builds](https://docs.expo.dev/develop/development-builds/introduction/) with `expo-dev-client`; see [Create a development build](https://docs.expo.dev/develop/development-builds/create-a-build/).
- Don't wrap your whole app in SafeAreaView, instead apply the styles to content inside your screens, from: [reactnavigation-summary](https://reactnavigation.org/docs/handling-safe-area/#summary)

## Chore

- install `ts-node` only to load the TypeScript **Jest** configuration.

## Local build

1. `npm install -g eas-cli`
2. `eas login`
3. Configure `eas.json`; see [eas.json](https://docs.expo.dev/eas/json)
4. `eas build --platform android --profile preview --local`

- `eas build --profile development-simulator --platform ios` — iOS Simulator build with a development client (not Expo Go); use when you need that workflow or a prerelease/canary Expo SDK.

### Hono RPC Type Sharing

`AppClientType` is imported from the backend project via the `@server/*` path alias in `tsconfig.json`, which points directly to the backend source:

```json
"@server/*": ["../cloudflare-workers-d1-hono-drizzle-better-auth-template/src/*"]
```

This means `bun run check-types` also type-checks the backend source files. To satisfy the compiler without pulling in the full Cloudflare Workers runtime types, `types/server.d.ts` provides minimal ambient stubs (`cloudflare:workers` module and the global `Env` interface).

**Trade-off vs. TypeScript project references:**

|                                  | Current approach (paths → source)  | Project references (paths → `.d.ts`)                     |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| API change reflected immediately | ✅                                 | ❌ Requires `tsc -b` in backend first                    |
| `check-types` scope              | Includes backend files             | Frontend only                                            |
| Setup cost                       | Minimal (just `types/server.d.ts`) | Needs `composite` + `declarationDir` in backend tsconfig |

Since the two projects are not in a monorepo and backend API changes should surface immediately on the frontend, the current approach is preferred. If IDE or CI type-check performance becomes a concern, migrate to [TypeScript project references](https://www.typescriptlang.org/docs/handbook/project-references.html).

## Refers

- [Ignite - the battle-tested React Native boilerplate](https://github.com/infinitered/ignite)
