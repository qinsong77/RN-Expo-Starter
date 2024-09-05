import { AUTH_TOKEN_KEY, GUEST_TOKEN } from '@/constant'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/core/utils/SecureStore'

import { User } from './type'

export const getSession = async () => {
  return await getStorageItem(AUTH_TOKEN_KEY)
}

export const isAuthenticated = async () => {
  const session = await getSession()
  return !!session
}

export const signIn = async (params: { email: string; password: string }) => {
  await setStorageItem(AUTH_TOKEN_KEY, params.email)
  return params.email
}

export const signOut = async () => {
  await removeStorageItem(AUTH_TOKEN_KEY)
}

export const getCurrentUser = async () => {
  const session = await getSession()
  return await new Promise<User>((resolve) =>
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Tom',
        // todo
        anonymous_id: session === GUEST_TOKEN ? 'anonymous_id_xxx' : undefined,
      })
    }, 2000),
  )
}
