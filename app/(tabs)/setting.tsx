import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Pressable, PressableProps, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme as useColorSchemeTw } from 'nativewind/dist/stylesheet'

import { Button, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { images } from '@/constant'
import { LIGHT_COLORS } from '@/constant/color'
import { useAuth } from '@/core/auth'

const Item = ({ text, ...rest }: { text: string } & PressableProps) => {
  return (
    <Pressable {...rest}>
      <View>
        <Text className="my-2">{text}</Text>
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
      <View className="absolute left-0 top-0 h-64 w-full rounded-b-xl bg-orange-500 dark:bg-orange-300" />

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
        <View className="bg-background mt-4 flex h-full rounded-2xl px-6 py-4 shadow dark:shadow-gray-700">
          <View className="flex flex-row items-center">
            <Image
              alt="avatar"
              source={images.adaptive}
              style={{ width: 40, height: 40, borderRadius: 40 }}
              contentFit="fill"
            />
            <Text className="ml-2 text-xl text-primary-900">
              Tom Hanks {isGuest && '- Guest'}
            </Text>
          </View>
          <Text
            size="lg"
            className="mt-3 text-red-700"
          >
            {t('settings.account_setting')}
          </Text>

          <View className="mt-10">
            {isGuest ? (
              <Button
                variant="outline"
                size="sm"
                action="primary"
                className="my-4"
                onPress={() => {
                  router.push('/auth/signin')
                }}
              >
                <ButtonText>{t('auth.sing_up')}</ButtonText>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                action="primary"
                className="my-4"
                onPress={() => signOut()}
              >
                <ButtonText>{t('auth.sign_out')}</ButtonText>
              </Button>
            )}
          </View>

          <Divider className="my-2" />

          <Item
            text={t('theme_switch')}
            onPress={() =>
              setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
            }
          />

          <Item
            text={t('lang_switch')}
            onPress={() => toggleLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
          />
          <Divider className="my-2" />

          <Text className="mt-2">{t('settings.more')}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
