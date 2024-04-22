import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { DARK_COLORS, LIGHT_COLORS } from '@/constant/color'

export const useColorTokens = () => {
  const { colorScheme: colorSchemeTw } = useColorSchemeTw()

  if (colorSchemeTw === 'dark') {
    return DARK_COLORS
  }
  return LIGHT_COLORS
}
