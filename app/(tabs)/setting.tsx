import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, PressableProps, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme as useColorSchemeTw } from 'nativewind/dist/stylesheet'

import { Button, Separator } from '@/components/ui'
import { images } from '@/constant'
import { LIGHT_COLORS } from '@/constant/color'
import { useAuth } from '@/core/auth'

const Item = ({ text, ...rest }: { text: string } & PressableProps) => {
  return (
    <Pressable {...rest}>
      <View>
        <Text className="my-4 text-primary">{text}</Text>
      </View>
    </Pressable>
  )
}

export default function Setting() {
  const { signOut, isGuest } = useAuth()
  const { t, i18n } = useTranslation()
  const { setColorScheme, colorScheme: colorSchemeTw } = useColorSchemeTw()

  const toggleLanguage = (locale: 'en' | 'zh') => {
    i18n.changeLanguage(locale)
  }

  return (
    <SafeAreaView className="flex h-full">
      <View className="absolute left-0 top-0 h-72 w-full rounded-b-xl bg-orange-500" />

      <View className="flex h-full px-4">
        <View className="flex flex-row items-center">
          <MaterialIcons
            name="settings"
            size={32}
            color={LIGHT_COLORS.background}
          />
          <Text className="ml-2 text-2xl font-semibold text-white">
            {t('settings.title')}
          </Text>
        </View>
        <View className="mt-12 flex h-full rounded-2xl bg-background px-6 py-4 shadow dark:shadow-gray-700">
          <View className="flex flex-row items-center">
            <Image
              alt="avatar"
              source={images.adaptive}
              style={{ width: 40, height: 40, borderRadius: 40 }}
              contentFit="fill"
            />
            <Text className="ml-2 text-xl text-primary">
              Tom Hanks {isGuest && '- Guest'}
            </Text>
          </View>
          <Separator className="my-6" />
          <Text className="mb-2 text-base text-primary/70">
            {t('settings.account_setting')}
          </Text>

          {isGuest ? (
            <Button
              size="sm"
              variant="secondary"
              className="my-4"
              label={t('auth.sing_up')}
              onPress={() => {
                router.push('/(auth)/sign-in')
              }}
            />
          ) : (
            <Button
              size="sm"
              variant="secondary"
              className="my-4"
              label={t('auth.sign_out')}
              onPress={() => signOut()}
            />
          )}

          <Item
            text={t('theme_switch')}
            onPress={() =>
              setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
            }
          />

          <Separator className="my-4" />

          <Text className="mb-2 text-base text-primary/70">
            {t('settings.more')}
          </Text>

          <Item
            text={t('lang_switch')}
            onPress={() => toggleLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
