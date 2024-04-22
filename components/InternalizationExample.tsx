import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet, Text, View } from 'react-native'

export const InternalizationExample = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = (locale: 'en' | 'zh') => {
    i18n.changeLanguage(locale)
  }
  return (
    <>
      <View style={styles.content}>
        <Button
          title={t('lang_switch.english')}
          onPress={() => toggleLanguage('en')}
        />
        <Button
          title={t('lang_switch.chinese')}
          onPress={() => toggleLanguage('zh')}
        />
        <Text className="text-primary">Current language: {i18n.language}</Text>
      </View>
    </>
  )
}

export const styles = StyleSheet.create({
  content: { gap: 20, padding: 20 },
})
