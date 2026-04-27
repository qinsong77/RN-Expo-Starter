import { Stack, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

import { Text } from '@/components/ui/text'

export default function ProtectedChatPlaceholder() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>()
  const chatId = Array.isArray(id) ? id[0] : id

  return (
    <>
      <Stack.Screen
        options={{
          title: `Chat ${chatId ?? ''}`.trim(),
          headerBackTitle: 'Back',
        }}
      />
      <View className="flex-1 p-4">
        <Text variant="p">
          If you see this, the protected layout let you through.
        </Text>
        <Text
          variant="muted"
          className="mt-2"
        >
          id: {chatId ?? '(none)'}
        </Text>
      </View>
    </>
  )
}
