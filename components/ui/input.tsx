import React, { forwardRef } from 'react'
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { cn } from '@/utils'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  onTrailingIconPress?: () => void
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      label,
      labelClasses,
      inputClasses,
      leadingIcon,
      trailingIcon,
      onTrailingIconPress,
      ...props
    },
    ref,
  ) => (
    <View className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Text
          className={cn('text-base font-medium text-primary', labelClasses)}
        >
          {label}
        </Text>
      )}

      <View
        className={cn(
          'flex flex-row items-center rounded-lg border border-input bg-background',
          inputClasses,
        )}
      >
        {leadingIcon && <View className="pl-3 pr-2">{leadingIcon}</View>}

        <TextInput
          ref={ref}
          className={cn(
            // add text-base will have line height, test is not align vertical in ios
            'flex-1 px-3 text-primary/80',
            Platform.OS === 'ios' ? 'py-4' : 'py-2.5',
            leadingIcon && 'pl-0',
            trailingIcon && 'pr-0',
          )}
          {...props}
        />

        {trailingIcon && (
          <TouchableOpacity
            onPress={onTrailingIconPress}
            className="pl-2 pr-3"
          >
            {trailingIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  ),
)

Input.displayName = 'Input'

export { Input }
