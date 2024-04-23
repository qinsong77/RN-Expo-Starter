import { fireEvent, render, screen } from '@testing-library/react-native'

import { Button } from '@/components/ui'

describe('[component] Button', () => {
  it('renders correctly', () => {
    render(<Button label="button" />)
    expect(screen.getByRole('button', { name: 'button' })).toBeOnTheScreen()
  })
})
