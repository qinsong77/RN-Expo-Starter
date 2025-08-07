import * as SplashScreen from 'expo-splash-screen'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import { authClient } from './auth-client'
import { AuthContextType } from './type'

// Keep the splash screen visible while we fetch resources https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 100,
  fade: true,
})

const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthenticated: false,
  isAnonymous: false,
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
  console.log(session)
  console.log(isPending)
  console.log(error)

  useEffect(() => {
    if (!isPending) {
      SplashScreen.hideAsync()
    }
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
