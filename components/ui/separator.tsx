import { Text, View } from 'react-native'

import { cn } from '@/utils'

type BaseProps = {
  className?: string
}

type HorizontalProps = BaseProps & {
  orientation?: 'horizontal'
  text?: string
  textPosition?: 'left' | 'center' | 'right'
  textClassName?: string
}

type VerticalProps = BaseProps & {
  orientation: 'vertical'
}

type SeparatorProps = HorizontalProps | VerticalProps

export const Separator = (props: SeparatorProps) => {
  if (props.orientation === 'vertical') {
    return (
      <View
        className={cn(
          'mx-1 h-full w-[1px] shrink-0 bg-border',
          props.className,
        )}
      />
    )
  }

  const { className, text, textPosition = 'center', textClassName } = props

  return (
    <View className={cn('my-2 flex-row items-center', className)}>
      <View
        className={cn(
          'h-[1px] flex-grow bg-border',
          textPosition === 'left' ? 'w-4 flex-grow-0' : '',
          textPosition === 'right' ? 'flex-grow' : '',
        )}
      />
      {text && (
        <Text
          className={cn(
            'px-3 text-sm text-primary/70',
            // textPosition === 'left' ? 'pl-0' : '',
            // textPosition === 'right' ? 'pr-0' : '',
            textClassName,
          )}
        >
          {text}
        </Text>
      )}
      <View
        className={cn(
          'h-[1px] flex-grow bg-border',
          textPosition === 'left' ? 'flex-grow' : '',
          textPosition === 'right' ? 'w-4 flex-grow-0' : '',
        )}
      />
    </View>
  )
}
