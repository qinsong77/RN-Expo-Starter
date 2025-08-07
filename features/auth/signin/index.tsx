import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { z } from 'zod'

import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from '@/components/ui/button'
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import {
  ArrowLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Icon,
} from '@/components/ui/icon'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { LinkText } from '@/components/ui/link'
import { Pressable } from '@/components/ui/pressable'
import { toast } from '@/components/ui/sonner'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { authClient } from '@/core/auth'
import { useSafelyGoBack } from '@/core/hooks/use-safely-go-back'

import { AuthViewLayout } from '../layout'
import { GoogleIcon } from './assets/icons/google'

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberme: z.boolean().optional(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

const LoginWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (formData: LoginSchemaType) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberme,
    })
    console.log('---- sign in log')
    console.log(data)
    console.log(error)
    if (error) {
      setError('password', {
        type: 'server',
        message: error.message || 'Login failed',
      })
      // toast.error(error.message || 'Login failed')
    } else {
      toast.success('Logged in successfully!')
      router.replace('/(tabs)/home')
    }
  }

  const handleShowPasswordState = () => setShowPassword((show) => !show)
  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(onSubmit)()
  }

  const goBack = useSafelyGoBack()

  return (
    <VStack
      className="w-full max-w-[440px]"
      space="md"
    >
      <VStack
        className="md:items-center"
        space="md"
      >
        <Pressable
          onPress={() => {
            goBack()
          }}
        >
          <Icon
            as={ArrowLeftIcon}
            className="text-background-800 md:hidden"
            size="xl"
          />
        </Pressable>
        <VStack>
          <Heading
            className="md:text-center"
            size="3xl"
          >
            Log in
          </Heading>
          <Text className="mt-1">Login to start using RN Starter</Text>
        </VStack>
      </VStack>
      <VStack className="w-full">
        <VStack
          space="xl"
          className="w-full"
        >
          <FormControl
            isInvalid={!!errors?.email}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email: value })
                    return true
                  } catch (error: any) {
                    return error.message
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Enter email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.email?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl
            isInvalid={!!errors.password}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ password: value })
                    return true
                  } catch (error: any) {
                    return error.message
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot
                    onPress={handleShowPasswordState}
                    className="pr-3"
                  >
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <HStack className="w-full justify-between">
            <Controller
              name="rememberme"
              defaultValue={false}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  size="sm"
                  value="Remember me"
                  isChecked={value}
                  onChange={onChange}
                  aria-label="Remember me"
                >
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link href="/auth/forgot-password">
              <LinkText className="text-sm font-medium text-primary-700 group-hover/link:text-primary-600">
                Forgot Password?
              </LinkText>
            </Link>
          </HStack>
        </VStack>
        <VStack
          className="my-7 w-full"
          space="lg"
        >
          <Button
            className="w-full"
            isDisabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting && <ButtonSpinner color={colors.gray[400]} />}
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
          <Button
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => {}}
          >
            <ButtonText className="font-medium">
              Continue with Google
            </ButtonText>
            <ButtonIcon as={GoogleIcon} />
          </Button>
        </VStack>
        <HStack
          className="self-center"
          space="sm"
        >
          <Text size="md">Don't have an account?</Text>
          <Link
            href="/auth/signup"
            replace
          >
            <LinkText
              className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
              size="md"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}

export const SignIn = () => {
  return (
    <AuthViewLayout>
      <LoginWithLeftBackground />
    </AuthViewLayout>
  )
}
