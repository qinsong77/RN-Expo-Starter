import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'

export default function TabLayout() {
  const { t } = useTranslation()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.chat'),
          tabBarIcon: ({ color }) => {
            console.log(color)
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
