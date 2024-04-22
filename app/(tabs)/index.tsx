import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useColorScheme } from 'react-native'

import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui'

export default function Index() {
  const colorScheme = useColorScheme()
  const { setColorScheme, colorScheme: colorSchemeTw } = useColorSchemeTw()

  const { t, i18n } = useTranslation()

  const toggleLanguage = (locale: 'en' | 'zh') => {
    i18n.changeLanguage(locale)
  }

  return (
    <>
      <Container>
        <Text className="my-4 text-2xl font-semibold text-primary">
          {t('greeting')}
        </Text>
        <Button
          label="switch theme"
          onPress={() =>
            setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
          }
        />
        <Button
          className="my-4"
          label="switch language"
          onPress={() => toggleLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
        />
        <Text className="text-primary">
          Current language: {i18n.language.toUpperCase()}
        </Text>
      </Container>
    </>
  )
}
