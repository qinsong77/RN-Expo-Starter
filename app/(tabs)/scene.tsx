import { Link } from 'expo-router'
import { Text } from 'react-native'

import { Container } from '@/components/Container'

export default function Scene() {
  return (
    <>
      <Container>
        <Text className="text-primary">scene</Text>
        <Link
          href="/modal"
          className="text-primary underline"
        >
          View modal
        </Link>
      </Container>
    </>
  )
}
