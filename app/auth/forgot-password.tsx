import { zodResolver } from '@hookform/resolvers/zod'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { Trans, useLingui } from '@lingui/react/macro'
import { Link } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/sonner'
import { Text } from '@/components/ui/text'

import { useThemeColors } from '@/hooks/use-theme-colors'

import { authClient } from '@/core/auth'
import { createLog } from '@/core/logger'

const log = createLog('auth/forgot-password')

const forgotPasswordSchema = z.object({
  email: z
    .email({ message: i18n._(msg`Invalid email address`) })
    .min(1, i18n._(msg`Email is required`)),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordScreen() {
  const { t } = useLingui()
  const colors = useThemeColors()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  async function onSubmit(formData: ForgotPasswordFormData) {
    const { data, error } = await authClient.requestPasswordReset({
      email: formData.email,
      redirectTo: '/auth/update-password',
    })
    log.debug('forgot password result', { data, error })
    if (error) {
      setError('email', {
        type: 'server',
        message: error.message || t`Failed to send reset email`,
      })
      toast.error(error.message || 'Failed to send reset email')
    } else {
      toast.success(t`Reset email sent! Please check your inbox.`)
    }
  }

  return (
    <View className="flex-1 pt-safe pb-safe">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
      >
        <View className="w-full gap-8 p-6 pt-8">
          {/* Back */}
          <Link
            href="/auth/signin"
            replace
            asChild
          >
            <Button
              variant="ghost"
              size="icon"
              className="self-start"
            >
              <ArrowLeft
                size={20}
                color={colors.foreground}
              />
            </Button>
          </Link>

          {/* Heading */}
          <View className="gap-1.5">
            <Text className="text-3xl font-bold tracking-tight">
              <Trans>Forgot password?</Trans>
            </Text>
            <Text variant="muted">
              <Trans>Enter your email to reset your password</Trans>
            </Text>
          </View>

          {/* Form */}
          <View className="gap-5">
            <View className="gap-1.5">
              <Label htmlFor="email">
                <Trans>Email</Trans>
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="email"
                    placeholder={t`m@example.com`}
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    returnKeyType="send"
                    submitBehavior="submit"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-sm text-destructive">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || !isValid}
            >
              <Text>
                {isSubmitting ? (
                  <Trans>Sending...</Trans>
                ) : (
                  <Trans>Send reset link</Trans>
                )}
              </Text>
            </Button>
          </View>

          <View className="flex-row flex-wrap items-center justify-center gap-1">
            <Text className="text-sm text-muted-foreground">
              <Trans>Remember your password?</Trans>
            </Text>
            <Link
              href="/auth/signin"
              replace
            >
              <Text className="text-sm text-primary underline underline-offset-4">
                <Trans>Sign in</Trans>
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
