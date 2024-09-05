import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <View className="flex px-4 py-2">{children}</View>
}

export const SafeContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex h-full">
      <View className="flex px-4 py-2 pt-1">{children}</View>
    </SafeAreaView>
  )
}
