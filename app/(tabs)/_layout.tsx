/**
import { useLingui } from '@lingui/react/macro'
import { Tabs } from 'expo-router'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'

import { useThemeColors } from '@/hooks/use-theme-colors'

export default function TabLayout() {
  const colors = useThemeColors()
  const { t } = useLingui()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t`Home`,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t`Explore`,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="paperplane.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: t`Chats`,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="bubble.left.and.bubble.right.fill"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: t`Setting`,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="gearshape.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
**/
// https://docs.expo.dev/router/advanced/native-tabs
import { useLingui } from '@lingui/react/macro'
import { NativeTabs } from 'expo-router/unstable-native-tabs'

import { useThemeColors } from '@/hooks/use-theme-colors'

export default function TabLayout() {
  const colors = useThemeColors()
  const { t } = useLingui()

  return (
    <NativeTabs tintColor={colors.primary}>
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>{t`Home`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md="home"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>{t`Explore`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'paperplane', selected: 'paperplane.fill' }}
          md="explore"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="chats">
        <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
        <NativeTabs.Trigger.Label>{t`Chats`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'bubble.left.and.bubble.right',
            selected: 'bubble.left.and.bubble.right.fill',
          }}
          md="chat"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="setting">
        <NativeTabs.Trigger.Label>{t`Setting`}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
          md="settings"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
