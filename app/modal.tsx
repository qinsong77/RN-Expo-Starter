import { Trans } from '@lingui/react/macro'
import { Link } from 'expo-router'
import { View } from 'react-native'

import { Text } from '@/components/ui/text'

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold">
        <Trans>This is a modal</Trans>
      </Text>
      <Link
        style={{
          marginTop: 10,
        }}
        href="/"
        dismissTo
      >
        <Text className="text-blue-500">
          <Trans>Go to home screen</Trans>
        </Text>
      </Link>
    </View>
  )
}
