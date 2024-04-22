import { usePathname } from 'expo-router'
import { Text } from 'react-native'

import { Container } from '@/components/Container'

export default function Page() {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <Container>
      <Text>test</Text>
    </Container>
  )
}
