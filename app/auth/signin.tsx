import { zodResolver } from '@hookform/resolvers/zod'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { Trans, useLingui } from '@lingui/react/macro'
import { Link, router } from 'expo-router'
import { Rocket } from 'lucide-react-native'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, type TextInput, View } from 'react-native'
import { z } from 'zod'

import { SSOBtns } from '@/components/sso-btns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/sonner'
import { Text } from '@/components/ui/text'

import { authClient } from '@/core/auth'
import { createLog } from '@/core/logger'

const log = createLog('auth/signin')

const loginSchema = z.object({
  email: z
    .email({ message: i18n._(msg`Invalid email address`) })
    .min(1, i18n._(msg`Email is required`)),
  password: z.string().min(1, i18n._(msg`Password is required`)),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function SignInScreen() {
  const { t } = useLingui()
  const passwordInputRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus()
  }

  async function onSubmit(formData: LoginFormData) {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    })
    log.debug('sign in result', { data, error })
    if (error) {
      setError('password', {
        type: 'server',
        message: error.message || t`Login failed`,
      })
      toast.error(error.message || 'Login failed')
    } else {
      toast.success(t`Logged in successfully!`)
      router.replace('/(tabs)/home')
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
          {/* Brand mark */}
          <View className="flex-row items-center gap-2.5">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Rocket
                size={15}
                color="white"
              />
            </View>
            <Text className="text-sm font-semibold text-muted-foreground">
              RN Expo Starter
            </Text>
          </View>

          {/* Heading */}
          <View className="gap-1.5">
            <Text className="text-3xl font-bold tracking-tight">
              <Trans>Sign in to your account</Trans>
            </Text>
            <Text variant="muted">
              <Trans>Welcome back! Please sign in to continue</Trans>
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
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={onEmailSubmitEditing}
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

            <View className="gap-1.5">
              <View className="flex-row items-center justify-between">
                <Label htmlFor="password">
                  <Trans>Password</Trans>
                </Label>
                <Link href="/auth/forgot-password">
                  <Text className="text-sm text-muted-foreground underline underline-offset-4">
                    <Trans>Forgot your password?</Trans>
                  </Text>
                </Link>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-sm text-destructive">
                  {errors.password.message}
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
                  <Trans>Submitting...</Trans>
                ) : (
                  <Trans>Continue</Trans>
                )}
              </Text>
            </Button>
          </View>

          <View className="flex-row flex-wrap items-center justify-center gap-1">
            <Text className="text-sm text-muted-foreground">
              <Trans>Don&apos;t have an account?</Trans>
            </Text>
            <Link href="/auth/signup">
              <Text className="text-sm text-primary underline underline-offset-4">
                <Trans>Sign up</Trans>
              </Text>
            </Link>
          </View>

          <View className="flex-row items-center gap-3">
            <Separator className="flex-1" />
            <Text className="text-sm text-muted-foreground">
              <Trans>or</Trans>
            </Text>
            <Separator className="flex-1" />
          </View>

          <SSOBtns />
        </View>
      </ScrollView>
    </View>
  )
}
