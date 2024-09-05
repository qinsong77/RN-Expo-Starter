import { Link, router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Dimensions,
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

const SignUp = () => {
  const { signIn } = useAuth()
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields')
    }

    setSubmitting(true)

    try {
      await signIn({
        email: form.email,
        password: form.password,
      })

      Alert.alert('Success', 'User signed in successfully')
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', 'sign in error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View
          className="flex h-full w-full justify-center px-4"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <TravelBusView />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Text className="mt-8 text-2xl font-semibold text-primary">
              Sign up to Starter
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
              label="Sign Up"
              onPress={submit}
              className="mt-7"
              isLoading={isSubmitting}
            />

            <View className="flex flex-row justify-center gap-2 pt-5">
              <Text className="text-primary">Have an account already?</Text>
              <Link
                href="/sign-in"
                className="text-primary underline"
              >
                Sign in
              </Link>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
