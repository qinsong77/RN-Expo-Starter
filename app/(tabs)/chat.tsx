import { useTranslation } from 'react-i18next'

import { SafeContainer } from '@/components/Container'
import { Text } from '@/components/ui/text'

export default function Chat() {
  const { t } = useTranslation()

  return (
    <SafeContainer>
      <Text className="mb-2 text-2xl font-semibold">{t('greeting')}</Text>
      <Text>What's up?</Text>
    </SafeContainer>
  )
}
