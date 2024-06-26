import { Text, TextInput, View } from 'react-native'

import { cn } from '@/utils'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
}

const Input = ({
  className,
  label,
  labelClasses,
  inputClasses,
  ...props
}: InputProps) => (
  <View className={cn('flex flex-col gap-1.5', className)}>
    {label && <Text className={cn('text-base', labelClasses)}>{label}</Text>}
    <TextInput
      className={cn(inputClasses, 'rounded-lg border border-input px-4 py-2.5')}
      {...props}
    />
  </View>
)

export { Input }
