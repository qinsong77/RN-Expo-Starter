import { Redirect, Stack } from 'expo-router'

import { useAuth } from '@/core/auth'
// import { Loader } from '@/components/ui'

const AuthRootLayout = () => {
  const { isAuthenticated, isLoading, isGuest } = useAuth()

  if (isAuthenticated && !isGuest && !isLoading)
    return <Redirect href="/home" />

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="create-password" />
      </Stack>
      {/*<Loader*/}
      {/*  isLoading={isLoading}*/}
      {/*  position="bottom"*/}
      {/*/>*/}
    </>
  )
}

export default AuthRootLayout
