import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native'

import { DARK_COLORS, LIGHT_COLORS } from './theme-colors'

const THEME = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
}

/**
 * overwrite the react-navigation default background rgb(242, 242, 242)
 * refers:
 * 1. https://reactnavigation.org/docs/themes/
 */
export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
}
