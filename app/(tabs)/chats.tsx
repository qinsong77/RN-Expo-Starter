import { Trans } from '@lingui/react/macro'
import { Link } from 'expo-router'
import { MessageCircle } from 'lucide-react-native'
import { ScrollView, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { useThemeColors } from '@/hooks/use-theme-colors'

import { useProtectedAction } from '@/core/auth'

export default function ChatsScreen() {
  const colors = useThemeColors()
  const wrappedProtectedAction = useProtectedAction()
  const onProtectedPress = wrappedProtectedAction((val: string) => {
    console.log(val)
  })
  return (
    <View className="p-5 pt-safe">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-3xl font-bold tracking-tight">
          <Trans>Chats</Trans>
        </Text>

        {/* Empty state */}
        <View className="items-center gap-4 py-16">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <MessageCircle
              size={36}
              color={colors.mutedForeground}
            />
          </View>
          <View className="items-center gap-1">
            <Text className="font-semibold">
              <Trans>No chats yet</Trans>
            </Text>
            <Text
              variant="muted"
              className="text-center text-sm"
            >
              <Trans>Your conversations will appear here</Trans>
            </Text>
          </View>
        </View>

        <Separator />

        {/* Auth demo */}
        <View className="gap-4 pt-6">
          <View className="gap-0.5">
            <Text variant="h4">
              <Trans>Auth-gated Features</Trans>
            </Text>
            <Text
              variant="muted"
              className="text-sm"
            >
              <Trans>Protected actions and routes demo</Trans>
            </Text>
          </View>

          <Button
            className="w-full"
            onPress={() => onProtectedPress('test')}
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
      </ScrollView>
    </View>
  )
}
