import { zodResolver } from '@hookform/resolvers/zod'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { Trans, useLingui } from '@lingui/react/macro'
import { Link, router } from 'expo-router'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, type TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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

const log = createLog('auth/signup')

const signupSchema = z
  .object({
    name: z.string().min(1, i18n._(msg`Name is required`)),
    email: z
      .email({ message: i18n._(msg`Invalid email address`) })
      .min(1, i18n._(msg`Email is required`)),
    password: z
      .string()
      .min(8, i18n._(msg`Password must be at least 8 characters`)),
    confirmPassword: z
      .string()
      .min(1, i18n._(msg`Please confirm your password`)),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n._(msg`Passwords do not match`),
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

export default function SignUpScreen() {
  const { t } = useLingui()
  const emailInputRef = React.useRef<TextInput>(null)
  const passwordInputRef = React.useRef<TextInput>(null)
  const confirmPasswordInputRef = React.useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onNameSubmitEditing() {
    emailInputRef.current?.focus()
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus()
  }

  function onPasswordSubmitEditing() {
    confirmPasswordInputRef.current?.focus()
  }

  async function onSubmit(formData: SignupFormData) {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    log.debug('sign up result', { data, error })
    if (error) {
      setError('email', {
        type: 'server',
        message: error.message || t`Account creation failed`,
      })
      toast.error(error.message || t`Account creation failed`)
    } else {
      toast.success(t`Account created successfully!`)
      router.replace('/(tabs)/home')
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
              <Trans>Create your account</Trans>
            </Text>
            <Text className="text-center text-sm text-muted-foreground sm:text-left">
              <Trans>Welcome! Please fill in the details to get started.</Trans>
            </Text>
          </View>

          <View className="gap-6 md:gap-8">
            {/* Name Field */}
            <View className="gap-1.5 md:gap-2">
              <Label htmlFor="name">
                <Trans>Name</Trans>
              </Label>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    id="name"
                    placeholder={t`John Doe`}
                    autoComplete="name"
                    autoCapitalize="words"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={onNameSubmitEditing}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                )}
              />
              {errors.name && (
                <Text className="text-sm text-destructive">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* Email Field */}
            <View className="gap-1.5 md:gap-2">
              <Label htmlFor="email">
                <Trans>Email</Trans>
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={emailInputRef}
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

            {/* Password Field */}
            <View className="gap-1.5 md:gap-2">
              <Label htmlFor="password">
                <Trans>Password</Trans>
              </Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry
                    returnKeyType="next"
                    onSubmitEditing={onPasswordSubmitEditing}
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

            {/* Confirm Password Field */}
            <View className="gap-1.5 md:gap-2">
              <Label htmlFor="confirmPassword">
                <Trans>Confirm Password</Trans>
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
                  <Trans>Creating account...</Trans>
                ) : (
                  <Trans>Create account</Trans>
                )}
              </Text>
            </Button>
          </View>

          <View className="flex-row flex-wrap items-center justify-center">
            <Text className="text-sm">
              <Trans>Already have an account?</Trans>{' '}
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

          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">
              <Trans>or</Trans>
            </Text>
            <Separator className="flex-1" />
          </View>

          <SSOBtns />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
