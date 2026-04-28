import { ThemeProvider } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaListener } from 'react-native-safe-area-context'
import { Uniwind, useUniwind } from 'uniwind'

import { NAV_THEME } from '@/constants/theme-nav'

import { Toaster } from '@/components/ui/sonner'

import { queryClient } from '@/core/api/queryClient'
import { AuthProvider } from '@/core/auth'
import { LinguiProvider, initLingui } from '@/core/i18n/lingui'

import '../global.css'

// Keep the splash screen visible while we fetch resources https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync() // will be hidden in <AuthProvider>
// Set the animation options. This is optional. https://docs.expo.dev/versions/latest/sdk/splash-screen/
// SplashScreen.setOptions({
//   duration: 100,
//   fade: true,
// })

initLingui()

function AppContent() {
  const { theme } = useUniwind()

  return (
    <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)}>
      <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="auth"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(protected)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Toaster />
      </ThemeProvider>
    </SafeAreaListener>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <LinguiProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </QueryClientProvider>
      </LinguiProvider>
    </GestureHandlerRootView>
  )
}
