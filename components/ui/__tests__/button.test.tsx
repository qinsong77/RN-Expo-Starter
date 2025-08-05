import { render, screen } from '@testing-library/react-native'

import { Button, ButtonText } from '@/components/ui/button'

describe('[component] Button', () => {
  it('renders correctly', () => {
    render(
      <Button>
        <ButtonText>Hello World!</ButtonText>
      </Button>)
    expect(screen.getByRole('button', { name: 'Hello World' })).toBeOnTheScreen()
  })
})
