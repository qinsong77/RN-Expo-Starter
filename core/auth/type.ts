import { Session } from './auth-client'

export type AuthContextType = {
  isPending: boolean
  session: Session | null
  isAuthenticated: boolean
  isAnonymous: boolean
}
