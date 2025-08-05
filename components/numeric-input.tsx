import React, { forwardRef, useState } from 'react'
import { Text, TextInput, View } from 'react-native'

import { cn } from '@/core/utils'

export interface NumericInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextInput>,
    'value' | 'onChangeText' | 'onChange' | 'defaultValue'
  > {
  label?: string
  labelClasses?: string
  inputClasses?: string
  defaultValue: number | null
  isInteger?: boolean
  onChange?: (newValue: number | null) => void // onChange 处理函数
}

const NumericInput = forwardRef<
  React.ElementRef<typeof TextInput>,
  NumericInputProps
>(
  (
    {
      className,
      label,
      labelClasses,
      inputClasses,
      defaultValue,
      onChange,
      isInteger,
      ...props
    },
    ref,
  ) => {
    const regex = isInteger ? /^(-)?(0|[1-9]\d*)$/ : /^-?\d*\.?\d*$/

    const [value, setValue] = useState<string | null>(
      defaultValue === null || defaultValue === undefined
        ? null
        : regex.test(defaultValue.toString())
          ? defaultValue.toString()
          : null,
    )
    const handleInputChange = (input: string) => {
      console.log(input)
      if (input === '' || (isInteger && input === '0')) {
        setValue(null)
        onChange && onChange(null)
        return
      }
      if (regex.test(input)) {
        if (!isInteger && input.endsWith('.')) {
          setValue(input)
          return
        }
        const newValue = isInteger ? parseInt(input, 10) : parseFloat(input)
        if (!isNaN(newValue)) {
          onChange && onChange(newValue)
          setValue(newValue.toString())
        }
      }
    }

    return (
      <View className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <Text className={cn('text-base font-semibold', labelClasses)}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            inputClasses,
            'border-input text-primary/80 rounded-lg border px-4 py-2.5',
          )}
          value={value !== null ? value : ''}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          {...props}
        />
      </View>
    )
  },
)

NumericInput.displayName = 'NumericInput'

export { NumericInput }
