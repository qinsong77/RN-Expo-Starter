import { useTranslation } from 'react-i18next'

import { useColorScheme as useColorSchemeTw } from 'nativewind'

import { SafeContainer } from '@/components/Container'
import { InternalizationExample } from '@/components/InternalizationExample'
import { Button, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'

export default function Home() {
  const { setColorScheme, colorScheme: colorSchemeTw } = useColorSchemeTw()

  const { t } = useTranslation()

  return (
    <SafeContainer>
      <Text className="mb-2 text-2xl font-semibold">{t('greeting')}</Text>
      <Button
        className="m-4"
        size="md"
        variant="solid"
        action="primary"
        onPress={() =>
          setColorScheme(colorSchemeTw === 'dark' ? 'light' : 'dark')
        }
      >
        <ButtonText>{t('theme_switch')}</ButtonText>
      </Button>

      <Divider />

      <InternalizationExample />
    </SafeContainer>
  )
}
