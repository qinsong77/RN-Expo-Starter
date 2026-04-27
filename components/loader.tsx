import { cn } from '@/lib/utils'
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native'

import { useThemeColors } from '@/hooks/use-theme-colors'

const osName = Platform.OS
const screenHeight = Dimensions.get('screen').height

export const Loader = ({
  isLoading = true,
  position = 'middle',
}: {
  isLoading?: boolean
  position?: 'middle' | 'bottom'
}) => {
  const { foreground } = useThemeColors()

  if (!isLoading) return null

  return (
    <View
      className={cn(
        'absolute z-10 flex h-full w-full items-center bg-muted-foreground opacity-35',
        position === 'middle' ? 'justify-center' : 'justify-end pb-52',
      )}
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        accessible
        accessibilityRole="progressbar"
        animating={isLoading}
        color={foreground}
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  )
}
