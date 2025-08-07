import * as SecureStore from 'expo-secure-store'

import { expoClient } from '@better-auth/expo/client'
import { anonymousClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8787', // Base URL of your Better Auth backend.
  plugins: [
    anonymousClient(),
    expoClient({
      scheme: 'rn-expo-starter',
      storagePrefix: 'rn-expo-starter',
      storage: SecureStore,
    }),
  ],
})

export type Session = ReturnType<typeof createAuthClient>['$Infer']['Session']
