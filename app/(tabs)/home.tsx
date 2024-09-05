import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'

import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { SafeContainer } from '@/components/Container'
import { InternalizationExample } from '@/components/InternalizationExample'
import { Button, Separator } from '@/components/ui'

export default function Home() {
  const { setColorScheme, colorScheme: colorSchemeTw } = useColorSchemeTw()

  const { t } = useTranslation()

  return (
    <SafeContainer>
      <Text className="mb-2 text-2xl font-semibold text-primary">
        {t('greeting')}
      </Text>
      <Button
        label={t('theme_switch')}
        onPress={() =>
          setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
        }
      />

      <Separator />

      <InternalizationExample />
    </SafeContainer>
  )
}
