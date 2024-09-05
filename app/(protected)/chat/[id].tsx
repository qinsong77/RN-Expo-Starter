import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, Text, View } from 'react-native'

import { HeaderBackButton } from '@react-navigation/elements'

import { Container } from '@/components/Container'
import { ThemedText } from '@/components/ui'

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
      <ThemedText>chat detail</ThemedText>
      <ThemedText>id: {id}</ThemedText>
    </Container>
  )
}
