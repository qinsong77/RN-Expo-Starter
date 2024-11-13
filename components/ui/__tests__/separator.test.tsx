import { render, screen } from '@testing-library/react-native'

import { Separator } from '@/components/ui'

describe('[component] Separator', () => {
  it('renders correctly', () => {
    render(<Separator text="separator" />)
    expect(screen.getByText('separator')).toBeOnTheScreen()
    // render(
    //   <>
    //     <Separator />
    //     <Separator text="Center Text" />
    //     <Separator
    //       text="Left Text"
    //       textPosition="left"
    //     />
    //     <Separator
    //       text="Right Text"
    //       textPosition="right"
    //       textClassName="font-bold"
    //     />
    //     <Separator
    //       orientation="vertical"
    //       className="h-8"
    //     />
    //   </>,
    // )
  })
})
