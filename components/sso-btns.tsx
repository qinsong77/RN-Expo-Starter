import { cn } from '@/lib/utils'
import { Trans } from '@lingui/react/macro'
import { Image, Platform, View } from 'react-native'
import { useUniwind } from 'uniwind'

import { authClient } from '@/core/auth'

import { Button } from './ui/button'
import { Text } from './ui/text'

const GoogleIconSource = {
  type: 'oauth_google',
  source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
  useTint: false,
}

const AppleIconSource = {
  type: 'oauth_apple',
  source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
  useTint: true,
}

function GoogleIcon() {
  const { theme } = useUniwind()
  return (
    <Image
      className={cn(
        'size-4',
        GoogleIconSource.useTint && Platform.select({ web: 'dark:invert' }),
      )}
      tintColor={Platform.select({
        native: GoogleIconSource.useTint
          ? theme === 'dark'
            ? 'white'
            : 'black'
          : undefined,
      })}
      source={GoogleIconSource.source}
    />
  )
}

function AppleIcon() {
  const { theme } = useUniwind()
  return (
    <Image
      className={cn(
        'size-4',
        AppleIconSource.useTint && Platform.select({ web: 'dark:invert' }),
      )}
      tintColor={Platform.select({
        native: AppleIconSource.useTint
          ? theme === 'dark'
            ? 'white'
            : 'black'
          : undefined,
      })}
      source={AppleIconSource.source}
    />
  )
}

export function SSOBtns() {
  return (
    <View className="gap-4 md:gap-6">
      <Button
        variant="outline"
        onPress={async () => {
          await authClient.signIn.social({
            provider: 'apple',
            callbackURL: '/',
          })
        }}
      >
        <Text>
          <Trans>Continue with Apple</Trans>
        </Text>
        <AppleIcon />
      </Button>
      <Button
        variant="outline"
        onPress={async () => {
          await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/',
          })
        }}
      >
        <Text>
          <Trans>Continue with Google</Trans>
        </Text>
        <GoogleIcon />
      </Button>
    </View>
  )
}
