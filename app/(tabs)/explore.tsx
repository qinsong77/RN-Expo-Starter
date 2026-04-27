import { Trans } from '@lingui/react/macro'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ExternalLink } from '@/components/external-link'
import { Text } from '@/components/ui/text'

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View className="p-3 md:p-4">
        <Text variant="h2">
          <Trans>Explore</Trans>
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text className="text-blue-500 underline">
            <Trans>Learn more</Trans>
          </Text>
        </ExternalLink>
      </View>
    </SafeAreaView>
  )
}
