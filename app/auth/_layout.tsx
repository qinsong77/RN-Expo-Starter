import { Redirect, Stack } from 'expo-router'

import { useAuth } from '@/core/auth'

const AuthRootLayout = () => {
  const { isAuthenticated, isPending, isAnonymous } = useAuth()

  if (isAuthenticated && !isAnonymous && !isPending)
    return <Redirect href="/home" />

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="update-password" />
    </Stack>
  )
}

export default AuthRootLayout
