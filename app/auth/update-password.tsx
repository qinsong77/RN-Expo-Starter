import { zodResolver } from '@hookform/resolvers/zod'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { Trans, useLingui } from '@lingui/react/macro'
import { Link, router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, type TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/sonner'
import { Text } from '@/components/ui/text'

import { authClient } from '@/core/auth'
import { createLog } from '@/core/logger'

const log = createLog('auth/update-password')

const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, i18n._(msg`Password must be at least 8 characters`)),
    confirmPassword: z
      .string()
      .min(1, i18n._(msg`Please confirm your password`)),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n._(msg`Passwords do not match`),
    path: ['confirmPassword'],
  })

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>

export default function UpdatePasswordScreen() {
  const { t } = useLingui()
  const { token } = useLocalSearchParams<{ token?: string }>()
  const confirmPasswordInputRef = React.useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  function onPasswordSubmitEditing() {
    confirmPasswordInputRef.current?.focus()
  }

  async function onSubmit(formData: UpdatePasswordFormData) {
    if (!token) {
      toast.error(t`Invalid or missing reset token`)
      return
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: formData.newPassword,
      token,
    })
    log.debug('update password result', { data, error })
    if (error) {
      setError('newPassword', {
        type: 'server',
        message: error.message || t`Failed to reset password`,
      })
      toast.error(error.message || 'Failed to reset password')
    } else {
      toast.success(t`Password updated successfully!`)
      router.replace('/auth/signin')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
      >
        <View className="mt-10 w-full gap-6 p-6 md:mt-16">
          <View className="gap-2">
            <Text className="text-center text-xl font-semibold sm:text-left">
              <Trans>Reset password</Trans>
            </Text>
            <Text className="text-center text-sm text-muted-foreground sm:text-left">
              <Trans>Enter your new password below</Trans>
            </Text>
          </View>

          <View className="gap-6">
            {/* New Password Field */}
            <View className="gap-1.5">
              <Label htmlFor="newPassword">
                <Trans>New password</Trans>
              </Label>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="newPassword"
                    secureTextEntry
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={onPasswordSubmitEditing}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={errors.newPassword ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.newPassword && (
                <Text className="text-sm text-destructive">
                  {errors.newPassword.message}
                </Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View className="gap-1.5">
              <Label htmlFor="confirmPassword">
                <Trans>Confirm password</Trans>
              </Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={confirmPasswordInputRef}
                    id="confirmPassword"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={
                      errors.confirmPassword ? 'border-destructive' : ''
                    }
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            >
              <Text>
                {isSubmitting ? (
                  <Trans>Updating...</Trans>
                ) : (
                  <Trans>Update password</Trans>
                )}
              </Text>
            </Button>
          </View>

          <View className="flex-row flex-wrap items-center justify-center">
            <Text className="text-sm">
              <Trans>Remember your password?</Trans>{' '}
            </Text>
            <Link href="/auth/signin">
              <Text className="text-sm text-primary underline underline-offset-4">
                <Trans>Sign in</Trans>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
