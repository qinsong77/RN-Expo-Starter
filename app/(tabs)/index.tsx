import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useColorScheme } from 'react-native'

import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { Container } from '@/components/Container'
import { InternalizationExample } from '@/components/InternalizationExample'
import { Button, Separator } from '@/components/ui'

export default function Index() {
  const colorScheme = useColorScheme()
  const { setColorScheme, colorScheme: colorSchemeTw } = useColorSchemeTw()

  const { t } = useTranslation()

  return (
    <Container>
      <Text className="mb-2 text-2xl font-semibold text-primary">
        {t('greeting')}
      </Text>
      <Button
        label="switch theme"
        onPress={() =>
          setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
        }
      />

      <Separator />

      <InternalizationExample />
    </Container>
  )
}
