// we always make sure 'react-native' gets included first
// https://github.com/infinitered/ignite/blob/master/boilerplate/test/setup.ts
import * as ReactNative from 'react-native'

import mockFile from './scripts/jest_mock/mockFile'

// libraries to mock
jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        // ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile),
        getSize: jest.fn(
          (
            uri: string,
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void,
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock('expo-localization', () => ({
  ...jest.requireActual('expo-localization'),
  getLocales: () => [{ languageTag: 'en-US', textDirection: 'ltr' }],
}))
