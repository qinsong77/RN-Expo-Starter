import { Trans } from '@lingui/react/macro'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Text as RNText, StyleSheet, View } from 'react-native'

import { HelloWave } from '@/components/hello-wave'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View className="flex-row gap-2">
        <Text className="text-2xl font-bold">
          <Trans>Welcome!</Trans>
        </Text>
        <HelloWave />
      </View>
      <Separator />
      <Text variant="muted">
        <Trans>
          Press below to open the modal, Long press to see the preview and menu
        </Trans>
      </Text>
      <View className="mb-2 gap-2">
        <Link href="/modal">
          <Link.Trigger>
            <RNText style={styles.stepText}>
              <Trans>Modal</Trans>
            </RNText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction
              title="Action"
              icon="cube"
              onPress={() => alert('Action pressed')}
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu
              title="More"
              icon="ellipsis"
            >
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
})
