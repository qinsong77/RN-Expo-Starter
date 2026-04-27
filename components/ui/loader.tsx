import { cn } from '@/lib/utils'
import { ActivityIndicator, Platform, View } from 'react-native'

import { useThemeColors } from '@/hooks/use-theme-colors'

const osName = Platform.OS

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
        'absolute inset-0 z-10 flex items-center bg-background opacity-55',
        position === 'middle' ? 'justify-center' : 'justify-end pb-52',
      )}
    >
      <ActivityIndicator
        animating={isLoading}
        color={foreground}
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  )
}
