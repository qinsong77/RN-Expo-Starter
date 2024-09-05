import { Redirect, Stack } from 'expo-router'

import { Loader } from '@/components/ui'
import { useAuth } from '@/core/auth'

const AuthLayout = () => {
  const { isAuthenticated, isLoading, isGuest } = useAuth()

  if (isAuthenticated && !isGuest && !isLoading)
    return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Loader
        isLoading={isLoading}
        position="bottom"
      />
    </>
  )
}

export default AuthLayout
