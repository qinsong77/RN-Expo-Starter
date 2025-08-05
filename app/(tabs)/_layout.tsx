import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

import { useColorTokens } from '@/core/hooks'

export default function TabLayout() {
  const { t } = useTranslation()
  const colors = useColorTokens()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => {
            return (
              <Entypo
                name="home"
                size={24}
                color={color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t('tabs.chat'),
          tabBarIcon: ({ color }) => {
            return (
              <Entypo
                name="chat"
                size={24}
                color={color}
              />
            )
          },
        }}
      />
      <Tabs.Screen
        name="scene"
        options={{
          title: t('tabs.sense'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-open-check"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: t('tabs.setting'),
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
