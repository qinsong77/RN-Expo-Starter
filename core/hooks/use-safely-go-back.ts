import { useRouter } from 'expo-router'
import { useCallback } from 'react'

export function useSafelyGoBack(backUpPath = '/') {
  const router = useRouter()
  return useCallback(() => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.push(backUpPath as '/')
    }
  }, [backUpPath, router])
}
