import { Link } from 'expo-router'
import { Text } from 'react-native'

import { SafeContainer } from '@/components/Container'
import { Button, ButtonText } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import DOMComponent from '@/components/web/dom-component'
import { useProtectedAction } from '@/core/auth'

export default function Scene() {
  const wrappedProtectedAction = useProtectedAction()
  const onBtnPress = wrappedProtectedAction((val: string) => {
    console.log(val)
  })
  return (
    <SafeContainer>
      <Text className="text-primary text-xl font-bold">Scene</Text>
      <Link
        href="/modal"
        className="text-primary underline"
      >
        View modal
      </Link>
      <Text className="text-xl">Protected action and route</Text>
      <Button onPress={() => onBtnPress('test')}>
        <ButtonText>protected action</ButtonText>
      </Button>
      <Link
        href="/(protected)/chat/1"
        className="text-primary mt-2 underline"
      >
        protected route
      </Link>
      <Divider className="my-3" />
      <DOMComponent
        name="notend"
        dom={{ matchContents: true }}
      />
    </SafeContainer>
  )
}
