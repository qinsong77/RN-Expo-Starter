import { Redirect, router } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button, Loader, Separator, ThemedText } from '@/components/ui'
import DOMComponent from '@/components/web/dom-component'
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
            <ThemedText className="text-center text-2xl font-bold">
              Discover Endless{'\n'}
              Possibilities with{' '}
              <ThemedText className="text-blue-600">Starter</ThemedText>
            </ThemedText>
          </View>

          <Text className="mt-5 text-center text-sm text-primary/80">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Starter
          </Text>

          <Button
            label="Continue with Email"
            onPress={() => router.push('/sign-in')}
            size="sm"
            className="mt-7 w-full"
          />

          <Button
            variant="secondary"
            label="Continue as guest"
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
          />
          <Separator />
          <DOMComponent name="sysuke" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome
