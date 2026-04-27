import { QueryClient, onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'
import { Platform } from 'react-native'

/**
 * React Query configuration for React Native
 * https://tanstack.com/query/latest/docs/framework/react/react-native
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // network status awareness
      networkMode: 'online',
      // cache time
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
})

if (Platform.OS !== 'web') {
  // https://tanstack.com/query/v5/docs/framework/react/react-native#online-status-management
  onlineManager.setEventListener((setOnline) => {
    let initialised = false

    const eventSubscription = Network.addNetworkStateListener((state) => {
      initialised = true
      setOnline(!!state.isConnected)
    })

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!initialised) {
          setOnline(!!state.isConnected)
        }
      })
      .catch(() => {
        // getNetworkStateAsync can reject on some platforms/SDK versions
      })

    return eventSubscription.remove
  })
}
