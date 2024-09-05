import { router, usePathname } from 'expo-router'
import { Alert } from 'react-native'

import { useAuth } from './context'

export const useProtectedAction = () => {
  const { isAuthenticated, isGuest } = useAuth()
  const pathname = usePathname()
  return <T extends (...args: any[]) => any>(callback: T) => {
    return (...args: Parameters<T>) => {
      if (isAuthenticated && !isGuest) {
        callback(args)
      } else {
        Alert.alert(
          'Auth confirm',
          'Need to sign in if you want to process the action',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                // todo add search parameter?
                router.push(`/(auth)/sign-in?redirect_url=${pathname}`)
              },
            },
          ],
        )
      }
    }
  }
}
