import { Redirect, router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Loader } from '@/components/ui/loader'
import { Text } from '@/components/ui/text'
import { GUEST_TOKEN } from '@/constant'
import { useAuth } from '@/core/auth'

const Welcome = () => {
  const { isLoading, isAuthenticated, signIn } = useAuth()

  if (!isLoading && isAuthenticated) return <Redirect href="/home" />

  return (
    <SafeAreaView className="h-full">
      <Loader
        isLoading={isLoading}
        position="bottom"
      />

      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="flex h-full w-full justify-center px-4">
          <TravelBusView />
          <View className="mt-2">
            <Heading
              className="text-center"
              bold
              size="lg"
            >
              Discover Endless{'\n'}
              Possibilities with{' '}
              <Text
                className="text-blue-600"
                size="xl"
              >
                Starter
              </Text>
            </Heading>
          </View>

          <Text
            className="mt-5 text-center"
            size="sm"
            italic
          >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Starter
          </Text>

          <Button
            onPress={() => router.push('/auth/signin')}
            size="sm"
            action="primary"
            className="mt-7 w-full"
          >
            <ButtonText>Continue with Email</ButtonText>
          </Button>

          <Button
            action="secondary"
            onPress={async () => {
              // todo guest login
              await signIn({
                email: GUEST_TOKEN,
                password: 'mocked_password',
              })
              router.replace('/(tabs)/home')
            }}
            size="sm"
            className="mt-4 w-full"
          >
            <ButtonText>Continue as guest</ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome
