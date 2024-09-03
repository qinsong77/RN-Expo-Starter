import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useTheme,
} from '@react-navigation/native'
import { useColorScheme as useColorSchemeTw } from 'nativewind'

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
    background: 'transparent',
  },
}

export default function RootLayout() {
  // compatible with web, because above useColorScheme(from 'react-native') not working on web, react-navigation will not change on web
  const { colorScheme: colorSchemeTw } = useColorSchemeTw()
  console.log('theme', colorSchemeTw)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={colorSchemeTw === 'dark' ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: true, title: 'tabs' }}
          />
          <Stack.Screen
            name="modal"
            options={{ title: 'Modal', presentation: 'modal' }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
