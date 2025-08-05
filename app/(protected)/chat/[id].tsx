import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, Text, View } from 'react-native'

import { HeaderBackButton } from '@react-navigation/elements'

import { Container } from '@/components/Container'

export default function Page() {
  const { id } = useLocalSearchParams()

  return (
    <Container>
      <Stack.Screen
        options={{
          title: 'chat detail',
          // not working on ios
          // headerBackVisible: true,
          // headerBackButtonMenuEnabled: true,
          // headerLeft: (props) => <HeaderBackButton {...props} />,
          // headerStyle: { backgroundColor: '#f4511e' },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          // headerBackVisible: true,
          // headerTitle: (props) => {
          //   console.log(props)
          //   return (
          //     <View className="flex flex-row items-center">
          //       <Image
          //         className="h-8 w-8"
          //         source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          //       />
          //       <Text>{props.children}</Text>
          //     </View>
          //   )
          // },
        }}
      />
      <Text>chat detail</Text>
      <Text>id: {id}</Text>
    </Container>
  )
}
