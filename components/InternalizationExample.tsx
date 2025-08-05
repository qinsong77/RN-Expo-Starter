import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

export const InternalizationExample = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = (locale: 'en' | 'zh') => {
    i18n.changeLanguage(locale)
  }
  return (
    <View>
      <Button
        className="my-4"
        onPress={() => toggleLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
      >
        <ButtonText>{t('lang_switch')}</ButtonText>
      </Button>
      <Text className="text-primary-900">
        Current language: {i18n.language.toUpperCase()}
      </Text>
    </View>
  )
}
