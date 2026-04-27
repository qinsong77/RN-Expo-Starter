import { router, usePathname } from 'expo-router'
import { Alert } from 'react-native'

import { createLog } from '@/core/logger'

import { useAuth } from './context'

const log = createLog('useProtectedAction')

export const useProtectedAction = () => {
  const { isAuthenticated, isAnonymous } = useAuth()
  const pathname = usePathname()
  return <T extends (...args: any[]) => any>(callback: T) => {
    return (...args: Parameters<T>) => {
      if (isAuthenticated && !isAnonymous) {
        callback(args)
      } else {
        Alert.alert(
          'Auth confirm',
          'Need to sign in if you want to process the action',
          [
            {
              text: 'Cancel',
              onPress: () => log.debug('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                // todo add search parameter?
                router.push(`/auth/signin?redirect_url=${pathname}`)
              },
            },
          ],
        )
      }
    }
  }
}
