import { ActivityIndicator, Dimensions, Platform, View } from 'react-native'

import { useColorTokens } from '@/hooks'
import { cn } from '@/utils'

const osName = Platform.OS
const screenHeight = Dimensions.get('screen').height

export const Loader = ({
  isLoading = true,
  position = 'middle',
}: {
  isLoading?: boolean
  position?: 'middle' | 'bottom'
}) => {
  const { foreground } = useColorTokens()

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
        animating={isLoading}
        color={foreground}
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  )
}
