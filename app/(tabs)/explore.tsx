import { Trans } from '@lingui/react/macro'
import { WebBrowserPresentationStyle, openBrowserAsync } from 'expo-web-browser'
import { ChevronRight, Compass } from 'lucide-react-native'
import { Pressable, View } from 'react-native'

import ParallaxScrollView from '@/components/parallax-scroll-view'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'

import { useThemeColors } from '@/hooks/use-theme-colors'

const RESOURCES = [
  {
    name: 'Expo SDK 55',
    url: 'https://docs.expo.dev',
    desc: 'SDK, EAS & Expo Router docs',
  },
  {
    name: 'Better Auth',
    url: 'https://www.better-auth.com',
    desc: 'Authentication framework',
  },
  {
    name: 'Lingui',
    url: 'https://lingui.dev',
    desc: 'i18n for React & React Native',
  },
  {
    name: 'Hono',
    url: 'https://hono.dev',
    desc: 'Type-safe edge API framework',
  },
  {
    name: 'TanStack Query',
    url: 'https://tanstack.com/query',
    desc: 'Async server state management',
  },
  {
    name: 'Uniwind',
    url: 'https://docs.uniwind.dev',
    desc: 'Tailwind CSS for React Native',
  },
  {
    name: 'react-native-reusables',
    url: 'https://rnr-docs.vercel.app',
    desc: 'shadcn/ui components for RN',
  },
] as const

function openLink(url: string) {
  return openBrowserAsync(url, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  })
}

export default function ExploreScreen() {
  const colors = useThemeColors()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0d9488', dark: '#042f2e' }}
      headerImage={
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 50,
              right: 70,
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -30,
              left: -10,
              width: 130,
              height: 130,
              borderRadius: 65,
              backgroundColor: 'rgba(255,255,255,0.07)',
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingBottom: 28,
            }}
          >
            <Compass
              size={52}
              color="rgba(255,255,255,0.9)"
            />
          </View>
        </View>
      }
    >
      <View className="gap-1 pb-1">
        <Text variant="h3">
          <Trans>Resources</Trans>
        </Text>
        <Text variant="muted">
          <Trans>Official docs for the stack</Trans>
        </Text>
      </View>

      <Separator />

      <View className="gap-1">
        {RESOURCES.map(({ name, url, desc }, index) => (
          <View key={name}>
            <Pressable
              onPress={() => openLink(url)}
              className="flex-row items-center gap-3 rounded-xl px-1 py-3.5 active:opacity-60"
            >
              <View className="flex-1 gap-0.5">
                <Text className="text-sm font-semibold">{name}</Text>
                <Text
                  variant="muted"
                  className="text-xs"
                >
                  {desc}
                </Text>
              </View>
              <ChevronRight
                size={16}
                color={colors.mutedForeground}
              />
            </Pressable>
            {index < RESOURCES.length - 1 && <Separator />}
          </View>
        ))}
      </View>
    </ParallaxScrollView>
  )
}
