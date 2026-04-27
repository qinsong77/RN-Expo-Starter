import { Trans } from '@lingui/react/macro'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { useProtectedAction } from '@/core/auth'

export default function ChatsScreen() {
  const wrappedProtectedAction = useProtectedAction()
  const onBtnPress = wrappedProtectedAction((val: string) => {
    console.log(val)
  })
  return (
    <SafeAreaView>
      <View className="gap-4 p-4 md:p-5">
        <View className="gap-1">
          <Text variant="h2">
            <Trans>Chats</Trans>
          </Text>
          <Text variant="p">
            <Trans>To be continued...</Trans>
          </Text>
        </View>

        <Separator />

        <View className="gap-3">
          <Text
            variant="h4"
            className="text-muted-foreground"
          >
            <Trans>Protected action and route</Trans>
          </Text>
          <Button
            className="w-full"
            onPress={() => onBtnPress('test')}
          >
            <Text>
              <Trans>Protected action</Trans>
            </Text>
          </Button>
          <Link
            href="/(protected)/chat/1"
            asChild
          >
            <Button
              variant="outline"
              className="w-full"
            >
              <Text>
                <Trans>Open protected chat(Route)</Trans>
              </Text>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}
