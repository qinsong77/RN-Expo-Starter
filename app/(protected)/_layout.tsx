import { Redirect, Stack, usePathname } from 'expo-router'

import { Loader } from '@/components/ui/loader'
import { useAuth } from '@/core/auth'

const ProtectedLayout = () => {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, isGuest } = useAuth()

  if (isLoading) return <Loader />

  if (!isAuthenticated || isGuest) {
    return <Redirect href={`/auth/signin?redirect_url=${pathname}`} />
  }

  return <Stack />
}

export default ProtectedLayout
