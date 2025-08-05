import { Link } from 'expo-router'
import React, { startTransition, useActionState, useState } from 'react'
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
import { Text } from '@/components/ui/text'
import { Toast, ToastTitle, useToast } from '@/components/ui/toast'
import { VStack } from '@/components/ui/vstack'
import { useSafelyGoBack } from '@/core/hooks/use-safely-go-back'

import { AuthViewLayout } from '../layout'
import { GoogleIcon } from './assets/icons/google'

const USERS = [
  {
    email: 'gabrial@gmail.com',
    password: 'Gabrial@123',
  },
  {
    email: 'tom@gmail.com',
    password: 'Tom@123',
  },
  {
    email: 'thomas@gmail.com',
    password: 'Thomas@1234',
  },
]

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
  rememberme: z.boolean().optional(),
})

type LoginSchemaType = z.infer<typeof loginSchema>

type ActionState = {
  emailValid: boolean
  passwordValid: boolean
}

const LoginWithLeftBackground = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const [actionState, submitAction, isPending] = useActionState(
    async (prevState: ActionState, data: LoginSchemaType) => {
      const user = USERS.find((element) => element.email === data.email)
      if (user) {
        if (user.password !== data.password) {
          return { emailValid: true, passwordValid: false }
        } else {
          toast.show({
            placement: 'bottom right',
            render: ({ id }) => (
              <Toast
                nativeID={id}
                variant="solid"
                action="success"
              >
                <ToastTitle>Logged in successfully!</ToastTitle>
              </Toast>
            ),
          })
          reset()
          return { emailValid: true, passwordValid: true }
        }
      } else {
        return { emailValid: false, passwordValid: true }
      }
    },
    { emailValid: true, passwordValid: true },
  )

  const handleState = () => setShowPassword((show) => !show)
  const handleKeyPress = () => {
    Keyboard.dismiss()
    handleSubmit(submitAction)()
  }
  const goBack = useSafelyGoBack()

  const handleLogin = handleSubmit((data) => {
    startTransition(() => {
      submitAction(data)
    })
  })

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
            isInvalid={!!errors?.email || !actionState.emailValid}
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
                {errors?.email?.message ||
                  (!actionState.emailValid && 'Email ID not found')}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Label Message */}
          <FormControl
            isInvalid={!!errors.password || !actionState.passwordValid}
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
                    onPress={handleState}
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
                {errors?.password?.message ||
                  (!actionState.passwordValid && 'Password was incorrect')}
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
            onPress={handleLogin}
          >
            {isPending && <ButtonSpinner color={colors.gray[400]} />}
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
