import { router, usePathname } from 'expo-router'
import { Alert } from 'react-native'

import { act, renderHook } from '@testing-library/react-native'

import { useProtectedAction } from '@/core/auth'

import { useAuth } from '../context'

// Mock the useAuth hook
jest.mock('../context', () => ({
  useAuth: jest.fn(),
}))

// Mock the expo-router
jest.mock('expo-router', () => ({
  usePathname: jest.fn(),
  router: {
    push: jest.fn(),
  },
}))

// Mock the Alert
jest.spyOn(Alert, 'alert')

describe('useProtectedAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the callback if the user is authenticated and not a guest', () => {
    // Mock the useAuth hook to return authenticated and not guest
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      isAnonymous: false,
    })

    const { result } = renderHook(() => useProtectedAction())

    const mockCallback = jest.fn()
    const protectedAction = result.current(mockCallback)

    act(() => {
      protectedAction('arg1', 'arg2')
    })

    expect(mockCallback).toHaveBeenCalledWith(['arg1', 'arg2'])
    expect(Alert.alert).not.toHaveBeenCalled()
  })

  it('should show an alert and navigate to sign-in if the user is not authenticated or is a guest', () => {
    // Mock the useAuth hook to return not authenticated or is guest
    ;(useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isAnonymous: true,
    })

    // Mock the usePathname to return a specific path
    ;(usePathname as jest.Mock).mockReturnValue('/current-path')

    const { result } = renderHook(() => useProtectedAction())

    const mockCallback = jest.fn()
    const protectedAction = result.current(mockCallback)

    act(() => {
      protectedAction('arg1', 'arg2')
    })

    expect(mockCallback).not.toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith(
      'Auth confirm',
      'Need to sign in if you want to process the action',
      [
        {
          text: 'Cancel',
          onPress: expect.any(Function),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: expect.any(Function),
        },
      ],
    )

    // Simulate pressing the "OK" button on the alert
    const okButton = (Alert.alert as jest.Mock).mock.calls[0][2][1]
    act(() => {
      okButton.onPress()
    })

    expect(router.push).toHaveBeenCalledWith(
      '/(auth)/sign-in?redirect_url=/current-path',
    )
  })
})
