import { Link } from 'expo-router'
import { Text } from 'react-native'

import { SafeContainer } from '@/components/Container'
import { Button, Separator, ThemedText } from '@/components/ui'
import DOMComponent from '@/components/web/dom-component'
import { useProtectedAction } from '@/core/auth'

export default function Scene() {
  const wrappedProtectedAction = useProtectedAction()
  const onBtnPress = wrappedProtectedAction((val: string) => {
    console.log(val)
  })
  return (
    <SafeContainer>
      <Text className="text-xl font-bold text-primary">Scene</Text>
      <Link
        href="/modal"
        className="text-primary underline"
      >
        View modal
      </Link>
      <ThemedText className="text-xl">Protected action and route</ThemedText>
      <Button
        label="protected action"
        onPress={() => onBtnPress('test')}
      />
      <Link
        href="/(protected)/chat/1"
        className="mt-2 text-primary underline"
      >
        protected route
      </Link>
      <Separator />
      <DOMComponent
        name="notend"
        dom={{ matchContents: true }}
      />
    </SafeContainer>
  )
}
