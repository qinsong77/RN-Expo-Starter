import { router, SplashScreen } from 'expo-router'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { AuthContextType } from './type'
import { getCurrentUser, getSession, signIn, signOut } from './utils'

// Keep the splash screen visible while we fetch resources https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync()

const AuthContext = createContext<AuthContextType>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  session: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isGuest: false,
})

export function useAuth() {
  const value = useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <AuthProvider />')
    }
  }

  return value
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false)
  const [session, setSession] = useState<AuthContextType['session']>(null)
  const [user, setUser] = useState<AuthContextType['user']>(null)
  useEffect(() => {
    console.log('AuthProvider effect run')
    const initAuth = async () => {
      try {
        const session = await getSession()
        // todo: a little tricky
        if (session) {
          router.replace('/home')
          const user = await getCurrentUser()
          if (user) {
            setSession(session)
            setUser(user)
          } else {
            router.replace('/')
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
      await SplashScreen.hideAsync()
    }
    initAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (...params: Parameters<typeof signIn>) => {
          setIsLoading(true)
          const session = await signIn(...params)
          const user = await getCurrentUser()
          if (session && user) {
            setSession(session)
            setUser(user)
          } else {
            throw new Error('cannot get session or user')
          }
          setIsLoading(false)
        },
        signOut: async () => {
          await signOut()
          setSession(null)
          setUser(null)
          router.dismissAll()
          router.replace('/sign-in')
        },
        session,
        user,
        isAuthenticated: session !== null && user !== null,
        isGuest: !!(session && user && user.anonymous_id),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
