import { Redirect, Stack, usePathname } from 'expo-router'

import { Loader } from '@/components/ui'
import { useAuth } from '@/core/auth'

const ProtectedLayout = () => {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, isGuest } = useAuth()

  if (isLoading) return <Loader />

  if (!isAuthenticated || isGuest) {
    return <Redirect href={`/(auth)/sign-in?redirect_url=${pathname}`} />
  }

  return <Stack />
}

export default ProtectedLayout
