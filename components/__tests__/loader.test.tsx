import { render, screen } from '@testing-library/react-native'

import { Loader } from '../loader'

jest.mock('@/hooks/use-theme-colors', () => ({
  useThemeColors: () => ({ foreground: '#111111' }),
}))

describe('Loader', () => {
  it('returns null when not loading', () => {
    const { toJSON } = render(<Loader isLoading={false} />)
    expect(toJSON()).toBeNull()
  })

  it('exposes a progress indicator when loading', () => {
    render(<Loader isLoading />)
    expect(screen.getByRole('progressbar')).toBeOnTheScreen()
  })
})
