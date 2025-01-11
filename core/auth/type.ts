export type User = {
  id: number
  name: string
  anonymous_id?: string
} | null

export type AuthContextType = {
  signIn: (params: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
  token: string | null
  user: User
  isLoading: boolean
  isAuthenticated: boolean
  isGuest: boolean
}
