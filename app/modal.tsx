import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { InternalizationExample } from 'components/InternalizationExample'

import { Container } from '@/components/Container'

export default function Modal() {
  return (
    <>
      <Container>
        <InternalizationExample />
      </Container>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  )
}
