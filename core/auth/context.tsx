import * as SplashScreen from 'expo-splash-screen'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import { createLog } from '@/core/logger'

import { authClient } from './auth-client'
import { AuthContextType } from './type'

const log = createLog('auth')

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  isAnonymous: true,
  isPending: true,
})

export function useAuth() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />')
    }
  }

  return value
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { data: session, isPending, error } = authClient.useSession()

  useEffect(() => {
    if (error) {
      log.error('useSession', error)
    }
    log.debug('useSession', { isPending, hasError: !!error, session })
  }, [session, isPending, error])

  useEffect(() => {
    if (!isPending) {
      SplashScreen.hideAsync()
      return
    }

    const timer = setTimeout(() => {
      SplashScreen.hideAsync()
      log.error('auth timeout: 10 seconds')
    }, 10 * 1000)

    return () => clearTimeout(timer)
  }, [isPending])

  const value: AuthContextType = useMemo(() => {
    return {
      session,
      isPending,
      isAuthenticated: !!session?.session?.token,
      isAnonymous: !!session?.user?.isAnonymous,
    }
  }, [session, isPending])

  return <AuthContext value={value}>{children}</AuthContext>
}
