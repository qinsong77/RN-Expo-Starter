import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { Button } from '@/components/ui'

export const InternalizationExample = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = (locale: 'en' | 'zh') => {
    i18n.changeLanguage(locale)
  }
  return (
    <View>
      <Button
        className="my-4"
        label={t('lang_switch')}
        onPress={() => toggleLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
      />
      <Text className="text-primary">
        Current language: {i18n.language.toUpperCase()}
      </Text>
    </View>
  )
}
