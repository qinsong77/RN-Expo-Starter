import { useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { AuthContextType } from './type'
import { getCurrentUser, getToken, signIn, signOut } from './utils'

// Keep the splash screen visible while we fetch resources https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

const AuthContext = createContext<AuthContextType>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  token: null,
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isGuest: false,
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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState<AuthContextType['token']>(null)
  const [user, setUser] = useState<AuthContextType['user']>(null)
  useEffect(() => {
    console.log('AuthProvider effect run')
    const initAuth = async () => {
      try {
        const token = await getToken()
        // todo: a little tricky
        if (token) {
          router.replace('/home')
          const user = await getCurrentUser()
          if (user) {
            setToken(token)
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
          const token = await signIn(...params)
          const user = await getCurrentUser()
          if (token && user) {
            setToken(token)
            setUser(user)
          } else {
            throw new Error('cannot get token or user')
          }
          setIsLoading(false)
        },
        signOut: async () => {
          await signOut()
          setToken(null)
          setUser(null)
          router.dismissAll()
          router.replace('/sign-in')
        },
        token,
        user,
        isAuthenticated: token !== null && user !== null,
        isGuest: !!(token && user && user.anonymous_id),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
