import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { InternalizationExample } from 'components/InternalizationExample'

import { ScreenContent } from '~/components/ScreenContent'

export default function Modal() {
  return (
    <>
      <ScreenContent
        path="app/modal.tsx"
        title="Modal"
      >
        <InternalizationExample />
      </ScreenContent>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  )
}
