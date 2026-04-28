import { Trans } from '@lingui/react/macro'
import { Redirect, router } from 'expo-router'
import { ScrollView, View } from 'react-native'

import { TravelBusView } from '@/components/travel-bus-view'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Text } from '@/components/ui/text'

import { authClient, useAuth } from '@/core/auth'

const TAGS = ['Expo 55', 'Better Auth', 'Lingui', 'Uniwind', 'Hono RPC']

export default function Welcome() {
  const { isPending, isAuthenticated } = useAuth()

  if (!isPending && isAuthenticated) return <Redirect href="/home" />

  return (
    <View className="flex-1 pt-safe pb-safe">
      <Loader
        isLoading={isPending}
        position="bottom"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand */}
        <View className="flex-1 items-center justify-center gap-8 px-6 py-8">
          <TravelBusView />

          <View className="items-center gap-3">
            <Text className="text-4xl font-bold tracking-tight">
              RN Expo Starter
            </Text>
            <Text
              variant="muted"
              className="text-center text-base"
            >
              <Trans>Production-ready React Native template</Trans>
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <View
                key={tag}
                className="rounded-full bg-secondary px-3 py-1.5"
              >
                <Text className="text-xs font-medium text-secondary-foreground">
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTAs */}
        <View className="gap-3 px-6 pb-4">
          <Button
            className="w-full"
            onPress={() => router.push('/auth/signin')}
          >
            <Text>
              <Trans>Continue with Email</Trans>
            </Text>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onPress={async () => {
              await authClient.signIn.anonymous()
              router.replace('/(tabs)/home')
            }}
          >
            <Text>
              <Trans>Continue as guest</Trans>
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
