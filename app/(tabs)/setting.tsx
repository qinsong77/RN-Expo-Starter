import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import { router } from 'expo-router'
import { MoonStar, Sunset, TvMinimalIcon } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'
import { Uniwind, useUniwind } from 'uniwind'

import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { authClient, useAuth } from '@/core/auth'
import { changeLanguage } from '@/core/i18n/lingui'
import { createLog } from '@/core/logger'

const log = createLog('settings')

type Theme = 'system' | 'light' | 'dark'

const ThemeIndicator = () => {
  const { theme, hasAdaptiveThemes } = useUniwind()

  log.debug('theme', theme)

  return (
    <View>
      <View className="rounded bg-gray-100 p-2 dark:bg-gray-800">
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Active theme: {theme}
        </Text>
        <Text className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {hasAdaptiveThemes ? 'Following system theme' : 'Fixed theme'}
        </Text>
      </View>
      <RadioGroup
        value={hasAdaptiveThemes ? 'system' : theme}
        onValueChange={(val) => {
          log.debug('theme change', val)
          // @ts-ignore
          Uniwind.setTheme(val)
        }}
        className="mt-4 gap-4"
      >
        <View className="flex flex-row items-center gap-3">
          <RadioGroupItem
            value="system"
            id="r1"
          />
          <Label htmlFor="r1">system</Label>
          <Icon as={TvMinimalIcon} />
        </View>
        <View className="flex flex-row items-center gap-3">
          <RadioGroupItem
            value="dark"
            id="r2"
          />
          <Label htmlFor="r2">dark</Label>
          <Icon as={MoonStar} />
        </View>
        <View className="flex flex-row items-center gap-3">
          <RadioGroupItem
            value="light"
            id="r3"
          />
          <Label htmlFor="r3">light</Label>
          <Icon as={Sunset} />
        </View>
      </RadioGroup>
    </View>
  )
}

export default function SettingScreen() {
  const { session, isAnonymous } = useAuth()
  log.debug('isAnonymous', isAnonymous)
  const { i18n } = useLingui()
  const user = session?.user
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <Text variant="h2">
        <Trans>Setting</Trans>
      </Text>
      <View className="gap-4">
        <View>
          <Text>
            <Trans>User Name: {user?.name ?? ''} </Trans>
          </Text>
          <Text>
            <Trans>Email: {user?.email ?? ''}</Trans>
          </Text>
          <Text>
            <Trans>Is Anonymous: {isAnonymous ? 'Yes' : 'No'}</Trans>
          </Text>
        </View>
        <Button
          variant="secondary"
          onPress={async () => {
            await authClient.signOut()
            router.replace('/')
          }}
        >
          <Text>
            <Trans>Sign out</Trans>
          </Text>
        </Button>
        <Separator />
        <Button
          variant="outline"
          onPress={async () => {
            await changeLanguage('en')
          }}
        >
          <Text>
            <Trans>English</Trans>
          </Text>
        </Button>
        <Button
          variant="outline"
          onPress={async () => {
            await changeLanguage('zh')
          }}
        >
          <Text>
            <Trans>Chinese</Trans>
          </Text>
        </Button>
        <Text>Current language: {i18n.locale ?? 'en'}</Text>
        <Separator />
        <ThemeIndicator />
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
})
