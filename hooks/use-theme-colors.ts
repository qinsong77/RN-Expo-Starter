import { useUniwind } from 'uniwind'

import { DARK_COLORS, LIGHT_COLORS } from '@/constants/theme-colors'

export const useThemeColors = () => {
  const { theme } = useUniwind()

  if (theme === 'dark') {
    return DARK_COLORS
  }
  return LIGHT_COLORS
}
