import { Trans } from '@lingui/react/macro'
import { Redirect, router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Text } from '@/components/ui/text'

import { authClient, useAuth } from '@/core/auth'

export default function Welcome() {
  const { isPending, isAuthenticated } = useAuth()

  if (!isPending && isAuthenticated) return <Redirect href="/home" />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader
        isLoading={isPending}
        position="bottom"
      />
      <ScrollView>
        <View className="mt-10 flex justify-center px-4 md:mt-12">
          <TravelBusView />
          <View className="mt-2">
            <Text
              className="text-center"
              variant="h3"
            >
              <Trans>Discover Endless{'\n'}Possibilities with</Trans>{' '}
              <Text
                className="text-blue-600"
                variant="h3"
              >
                <Trans>Starter</Trans>
              </Text>
            </Text>
          </View>

          <Text
            className="mt-5 text-center"
            variant="p"
          >
            <Trans>
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Starter
            </Trans>
          </Text>

          <Button
            onPress={() => router.push('/auth/signin')}
            size="sm"
            variant="default"
            className="mt-7 w-full"
          >
            <Text>
              <Trans>Continue with Email</Trans>
            </Text>
          </Button>

          <Button
            variant="secondary"
            onPress={async () => {
              await authClient.signIn.anonymous()
              router.replace('/(tabs)/home')
            }}
            size="sm"
            className="mt-4 w-full"
          >
            <Text>
              <Trans>Continue as guest</Trans>
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
