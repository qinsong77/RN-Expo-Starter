import { Text as RnText, TextProps } from 'react-native'

import { cn } from '@/utils'

export const ThemedText = ({
  children,
  className,
  ...rest
}: { className?: string } & TextProps) => {
  return (
    <RnText
      {...rest}
      className={cn('text-primary', className)}
    >
      {children}
    </RnText>
  )
}
