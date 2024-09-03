import { View } from 'react-native'

import { cn } from '@/utils'

export const Separator = ({
  className,
  orientation = 'horizontal',
}: {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}) => {
  return (
    <View
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal'
          ? 'my-2 h-[1px] w-full'
          : 'mx-1 h-full w-[1px]',
        className,
      )}
    />
  )
}
