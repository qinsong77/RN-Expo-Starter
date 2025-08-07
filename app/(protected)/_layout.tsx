import { Redirect, Stack, usePathname } from 'expo-router'

import { Loader } from '@/components/ui/loader'
import { useAuth } from '@/core/auth'

const ProtectedLayout = () => {
  const pathname = usePathname()
  const { isAuthenticated, isPending, isAnonymous } = useAuth()

  if (isPending) return <Loader />

  if (!isAuthenticated || isAnonymous) {
    return <Redirect href={`/auth/signin?redirect_url=${pathname}`} />
  }

  return <Stack />
}

export default ProtectedLayout
