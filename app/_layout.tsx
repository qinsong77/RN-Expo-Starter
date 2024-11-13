import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { Toaster } from '@/components/ui/sonner'
import { LIGHT_COLORS } from '@/constant/color'
import { AuthProvider } from '@/core/auth'

import '../global.css'
import '../translation'

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(drawer)',
// }
/**
 * overwrite the react-navigation default background rgb(242, 242, 242)
 * refers:
 * 1. https://reactnavigation.org/docs/themes/
 * 2. https://docs.expo.dev/router/appearance/#react-navigation-themes
 */
const overwriteDefaultTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: LIGHT_COLORS.background,
  },
}

export default function RootLayout() {
  // compatible with web, because above useColorScheme(from 'react-native') not working on web, react-navigation will not change on web
  const { colorScheme: colorSchemeTw } = useColorSchemeTw()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={colorSchemeTw === 'dark' ? DarkTheme : overwriteDefaultTheme}
      >
        <AuthProvider>
          <Toaster />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ title: 'Modal', presentation: 'modal' }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                title: 'tabs',
                headerBackVisible: false,
              }}
            />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
