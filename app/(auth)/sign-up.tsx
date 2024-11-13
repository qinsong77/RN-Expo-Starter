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

import { EyeOff, LockIcon, Mail } from 'lucide-react-native'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button, Input, Separator } from '@/components/ui'
import { toast } from '@/components/ui/sonner'
import { useAuth } from '@/core/auth'

const SignUp = () => {
  const [passportVisible, setPassportVisible] = useState(true)
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
    const toastId = toast.loading('Sign Up...')

    try {
      await signIn({
        email: form.email,
        password: form.password,
      })

      toast.success('Sign Up successfully!', {
        id: toastId,
      })
      router.replace('/home')
    } catch (e) {
      toast.error('Sign Up failed!', {
        id: toastId,
      })
    } finally {
      setSubmitting(false)
      toast.dismiss(toastId)
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
            <Text className="mt-2 text-2xl font-semibold text-primary">
              Sign up to Starter
            </Text>

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
              label="Sign Up"
              onPress={submit}
              className="mt-7"
              isLoading={isSubmitting}
            />
          </KeyboardAvoidingView>
          <Separator
            text="or"
            className="mt-6"
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
