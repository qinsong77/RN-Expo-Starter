import { Link } from 'expo-router'
import { Text } from 'react-native'

import { Container } from '@/components/Container'

export default function Scene() {
  return (
    <>
      <Container>
        <Text>scene</Text>
        <Link href="/modal">View modal</Link>
      </Container>
    </>
  )
}
