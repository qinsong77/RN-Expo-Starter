import { AUTH_TOKEN_KEY, GUEST_TOKEN } from '@/constant'
import {
  getSecureStorageItem,
  removeSecureStorageItem,
  setSecureStorageItem,
} from '@/core/utils/SecureStore'

import { User } from './type'

export const getToken = async () => {
  return await getSecureStorageItem(AUTH_TOKEN_KEY)
}

export const isAuthenticated = async () => {
  const token = await getToken()
  return !!token
}

export const signIn = async (params: { email: string; password: string }) => {
  await setSecureStorageItem(AUTH_TOKEN_KEY, params.email)
  return params.email
}

export const signOut = async () => {
  await removeSecureStorageItem(AUTH_TOKEN_KEY)
}

export const getCurrentUser = async () => {
  const token = await getToken()
  return await new Promise<User>((resolve) =>
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Tom',
        // todo
        anonymous_id: token === GUEST_TOKEN ? 'anonymous_id_xxx' : undefined,
      })
    }, 2000),
  )
}
