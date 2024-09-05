import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

export async function setStorageItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value)
    return
  }
  await SecureStore.setItemAsync(key, value)
}

export async function getStorageItem(key: string) {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key)
  }
  return await SecureStore.getItemAsync(key)
}

export async function removeStorageItem(key: string) {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key)
    return
  }
  await SecureStore.deleteItemAsync(key)
}
