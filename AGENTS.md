---
name: RN Expo Starter Agent
description: Expert React Native + Expo developer for this starter project. Writes type-safe, well-tested, internationalized mobile code following the conventions established in this codebase.
---

# RN Expo Starter — Agent Instructions

## Project Overview

React Native + Expo 55 starter with file-based routing, Tailwind CSS, authentication, i18n, and Hono RPC. Stack: **Expo 55 / React Native 0.83 / React 19 / TypeScript (strict) / Expo Router / uniwind (Tailwind) / better-auth / Lingui / React Query / Jest**.

Package manager: **bun only** (`preinstall` hook enforces this). All scripts are in `package.json`. Before finishing any task, run `bun run check-types && bun run lint && bun run test`.

## Project Structure

```
app/                    # Expo Router pages (file-based routing)
  _layout.tsx           # Root layout
  (tabs)/               # Tab navigator group
  (protected)/          # Auth-gated routes
  auth/                 # Auth screens (signin, signup, forgot-password)

components/
  ui/                   # Base UI primitives (shadcn-style via react-native-reusables)
  *.tsx                 # Shared feature-agnostic components

core/
  auth/                 # better-auth client, context, useProtectedAction hook
  api/                  # Hono RPC client, React Query queryClient
  i18n/                 # Lingui setup
  logger.ts             # App-wide logger (react-native-logs)

features/               # Feature modules (co-locate components, hooks, tests)
hooks/                  # Shared custom hooks
lib/
  utils.ts              # cn() and shared utilities
constants/              # Theme colors, design tokens
locales/                # i18n .po/.ts files (en, zh)
types/                  # Ambient type declarations
```

## Code Style

### TypeScript

- Strict mode — no `any`, no `as unknown as X` asap hacks.
- Prefer `type` over `interface` unless declaration merging is needed.
- Export named, not default, from non-route files.
- Use `@/` aliases (mapped to project root in `tsconfig.json`) — never use relative `../../` paths that cross directory boundaries.

### Components

```tsx
// ✅ Good — typed props, no inline styles, uses cn()
import { cn } from '@/lib/utils'
import { Text, View } from 'react-native'

type Props = { label: string; className?: string }

export function MyComponent({ label, className }: Props) {
  return (
    <View className={cn('flex-1 p-4', className)}>
      <Text className="text-base text-foreground">{label}</Text>
    </View>
  )
}

// ❌ Bad — StyleSheet, untyped props, default export in shared file
export default function MyComponent(props: any) {
  return (
    <View style={{ flex: 1 }}>
      <Text>{props.label}</Text>
    </View>
  )
}
```

### Styling

- Use **uniwind** (Tailwind) class names — no `StyleSheet.create()` in new code.
- Use `cn()` from `@/lib/utils` for conditional classes.
- Use theme tokens (`text-foreground`, `bg-background`, `text-primary`) — not raw colors.
- For non-className color props (e.g. icon `color`, chart `stroke`), use `useThemeColors()` from `@/hooks/use-theme-colors` — e.g. `<Icon color={colors.primary} />`.
- **Never use `SafeAreaView`**. Instead, use Uniwind's native inset utilities — `SafeAreaListener` is set up once in 
`_layout.tsx` and keeps all insets in sync.
  - **Tab screens** (`(tabs)/`): `<View className="flex-1 pt-safe">` — tab bar handles the bottom.
  - **Standalone screens** (auth, index): `<View className="flex-1 pt-safe pb-safe">`.
  - Available utilities: `pt-safe`, `pb-safe`, `pl-safe`, `pr-safe`, `mt-safe`, `mb-safe`, `top-safe`, `bottom-safe`, etc.
  - `ScrollView` should below the `View` that used the safe area utilities.

### Internationalization (Lingui)

Every user-visible string must be wrapped with a Lingui macro — never use bare string literals in UI:

- **In JSX**: `<Trans>Hello world</Trans>` — import `Trans` from `@lingui/react/macro`
- **In props / expressions**: `` t`Submit` `` — get `t` from `useLingui()` imported from `@lingui/react/macro` (compile-time, returns `{ t }`)
- **Outside React** (utils, alerts): `i18n._(msg`Label`)` — import `i18n` from `@lingui/core`, `msg` from `@lingui/core/macro`

`@lingui/react/macro` is compile-time (use this for extraction). `@lingui/react` is runtime — do not use it for string wrapping.

After adding new strings: `bun run i18n:extract` → edit `.po` → `bun run i18n:compile`.

### Logging

```ts
import { createLog } from '@/core/logger'

const log = createLog('feature-name') // namespaced — preferred over global log

log.debug('verbose trace') // stripped in production release builds (__DEV__ = false)
log.info('user signed in')
log.error('request failed', error)
```

Never log secrets, tokens, or PII.

### API / Data Fetching

- Use the Hono RPC client at `@/core/api/rpc-client.ts` for type-safe backend calls.
- Wrap all server state in **React Query** (`useQuery`, `useMutation`).

### Authentication

- Gate screens via the `(protected)` route group layout.
- Gate actions via `useProtectedAction` from `@/core/auth`.
- Read session state only through `useAuth()` — never access the auth client directly in components.

## Testing

Framework: **Jest + jest-expo + React Native Testing Library (RNTL)**. Coverage collected from `components/`, `features/`, `core/`.

- Co-locate tests in `__tests__/` next to the source file.
- Query by role/text — use `testID` only as a last resort.
- Mock only at system boundaries (network, native modules). `expo-secure-store` is auto-mocked in jest config.

```ts
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}))
```

## Installing Packages

```bash
bunx expo install expo-camera   # Expo SDK packages — auto-selects compatible version
bun add zod                     # regular packages
```

Never use `npm` or `yarn`.

## Git Workflow

Commits follow **Conventional Commits** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Commitlint + Husky enforce this. Never skip hooks (`--no-verify`) without explicit user permission.

## Boundaries

**Always**

**Ask first**

- Adding a new dependency — confirm compatibility with Expo 55 / React Native 0.83.
- Changing auth flow, route guards, or session handling.
- Modifying `core/api/queryClient.ts` or `core/auth/auth-client.ts` (shared singletons).
- Running `bun run i18n:clean` (removes unused message IDs — destructive).

**Never**

- Commit secrets or `.env` files.
