import { Stack } from 'expo-router'
import { Text } from 'react-native'

import { Container } from '@/components/Container'
import { InternalizationExample } from '@/components/InternalizationExample'

export default function Home() {
  return (
    <>
      <Container>
        <Text>setting</Text>
        <InternalizationExample />
      </Container>
    </>
  )
}
