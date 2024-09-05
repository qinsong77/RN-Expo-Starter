import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { InternalizationExample } from 'components/InternalizationExample'

import { SafeContainer } from '@/components/Container'

export default function Modal() {
  return (
    <>
      <SafeContainer>
        <InternalizationExample />
      </SafeContainer>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  )
}
