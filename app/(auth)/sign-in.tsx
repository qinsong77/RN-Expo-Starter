import { Link, router, useGlobalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/core/auth'

const SignIn = () => {
  const { redirect_url } = useGlobalSearchParams()
  const { signIn } = useAuth()
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setSubmitting(true)

    try {
      await signIn({
        email: form.email,
        password: form.password,
      })

      Alert.alert('Success', 'User signed in successfully')
      router.replace(redirect_url ? (redirect_url as '/home') : '/home')
    } catch (error) {
      Alert.alert('Error', 'sign in error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="flex h-full w-full justify-center px-4">
          <TravelBusView />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Text className="mt-8 text-2xl font-semibold text-primary">
              Sign in to Starter
            </Text>

            <Input
              label="Email"
              value={form.email}
              onChangeText={(e) => setForm({ ...form, email: e })}
              className="mt-7"
              inputMode="email"
            />

            <Input
              label="Password"
              value={form.password}
              onChangeText={(e) => setForm({ ...form, password: e })}
              className="mt-2"
            />

            <Button
              label="Sign In"
              onPress={submit}
              className="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex flex-row justify-center gap-2 pt-5">
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
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
