import { SafeAreaView } from 'react-native'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex flex-1 px-4 py-2">{children}</SafeAreaView>
  )
}
