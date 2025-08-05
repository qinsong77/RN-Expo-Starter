import * as SecureStore from 'expo-secure-store'

import { expoClient } from '@better-auth/expo/client'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:8081', // Base URL of your Better Auth backend.
  plugins: [
    expoClient({
      scheme: 'rn-expo-starter',
      storagePrefix: 'rn-expo-starter',
      storage: SecureStore,
    }),
  ],
})
