import { Link, router, useGlobalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { EyeOff, LockIcon, Mail } from 'lucide-react-native'

import TopBgSvg from '@/app/(auth)/_component/top-bg-svg'
import { Button, Input, Separator } from '@/components/ui'
import { toast } from '@/components/ui/sonner'
import { useAuth } from '@/core/auth'

const SignIn = () => {
  const { redirect_url } = useGlobalSearchParams()
  const { signIn } = useAuth()
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [passportVisible, setPassportVisible] = useState(true)

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setSubmitting(true)
    const toastId = toast.loading('Sign In...')
    try {
      await signIn({
        email: form.email,
        password: form.password,
      })

      toast.success('Sign In successfully!', {
        id: toastId,
      })
      router.replace(redirect_url ? (redirect_url as '/home') : '/home')
    } catch (error) {
      // throw new Error('sign in error')
      toast.error('Sign In failed!', {
        id: toastId,
      })
    } finally {
      setSubmitting(false)
      toast.dismiss(toastId)
    }
  }

  return (
    // <SafeAreaView className="h-full">
    // <ScrollView>
    <View className="flex-1">
      <StatusBar style="light" />
      <View>
        <View className="h-48 w-full bg-brand" />
        <TopBgSvg />
      </View>
      <View className="flex px-4">
        <Text className="mt-0 text-2xl font-semibold text-primary">
          Welcome to Starter
        </Text>
        {/*todo KeyboardAvoidingView not working on ios, working on android if the whole view nested by ScrollView*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Input
            label="Email"
            value={form.email}
            onChangeText={(e) => setForm({ ...form, email: e })}
            className="mt-7"
            inputMode="email"
            leadingIcon={
              <Mail
                size={20}
                color="#6b7280"
              />
            }
          />

          <Input
            className="mt-4"
            // fixme: issue https://github.com/facebook/react-native/issues/27946
            secureTextEntry={passportVisible}
            label="Password"
            value={form.password}
            onChangeText={(e) => setForm({ ...form, password: e })}
            leadingIcon={
              <LockIcon
                size={20}
                color="#6b7280"
              />
            }
            trailingIcon={
              <EyeOff
                size={20}
                color="#6b7280"
              />
            }
            onTrailingIconPress={() => {
              setPassportVisible((value) => !value)
            }}
          />

          <Button
            label="Sign In"
            onPress={submit}
            className="mt-7"
            isLoading={isSubmitting}
          />
        </KeyboardAvoidingView>
        <Separator
          text="or"
          className="mt-6"
        />
        <View className="mt-4 flex flex-row justify-center gap-2">
          <Text className="text-primary">Don't have an account?</Text>
          <Link
            href={
              redirect_url
                ? `/(auth)/sign-up?redirect_url=${redirect_url}`
                : '/(auth)/sign-up'
            }
            className="text-primary underline"
          >
            Sign up
          </Link>
          <Text className="text-primary">or</Text>
          <Link
            href={redirect_url ? `/?redirect_url=${redirect_url}` : '/'}
            className="text-primary underline"
          >
            as a guest
          </Link>
        </View>
      </View>
    </View>
    // </ScrollView>
    // </SafeAreaView>
  )
}

export default SignIn
