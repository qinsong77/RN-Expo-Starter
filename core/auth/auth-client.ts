import { expoClient } from '@better-auth/expo/client'
import { anonymousClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import * as SecureStore from 'expo-secure-store'

import { generateAPIUrl } from '../utils/generate-api-url'

export const authClient = createAuthClient({
  baseURL: generateAPIUrl(),
  plugins: [
    anonymousClient(),
    expoClient({
      scheme: 'sidekickapp',
      storagePrefix: 'sidekickapp',
      storage: SecureStore,
    }),
  ],
})

export type Session = ReturnType<typeof createAuthClient>['$Infer']['Session']
