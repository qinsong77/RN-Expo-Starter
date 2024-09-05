import { renderHook } from '@testing-library/react-native'

import { useAuth } from '../context'
import { useProtectedAction } from '../useProtectedAction'

jest.mock('../context')

// fixme
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('[hooks]-useProtectedAction', () => {
  it('should not invoke callback when isAuthenticated is false', () => {
    jest.mocked(useAuth).mockImplementationOnce(
      () =>
        ({
          isAuthenticated: false,
          isGuest: false,
        }) as any,
    )
    const { result } = renderHook(() => useProtectedAction())
    const cb = jest.fn()
    result.current(cb)
    expect(cb).not.toHaveBeenCalled()
    // expect(Alert).toHaveBeenCalled()
  })
})
