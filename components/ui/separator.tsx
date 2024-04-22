import { View } from 'react-native'

import { cn } from '@/utils'

export const Separator = ({ className }: { className?: string }) => {
  return <View className={cn('h-[1px] w-full shrink-0 bg-border', className)} />
}
