import { render, screen, fireEvent } from '@testing-library/react'
import { LeftPanel } from '@/presentation/components/layout/LeftPanel'

describe('LeftPanel', () => {
  it('renders children when not collapsed', () => {
    render(
      <LeftPanel>
        <div>child content</div>
      </LeftPanel>,
    )
    expect(screen.getByText('child content')).toBeInTheDocument()
    expect(screen.getByText('child content')).toBeVisible()
  })

  it('renders Explorer heading', () => {
    render(
      <LeftPanel>
        <div>child</div>
      </LeftPanel>,
    )
    expect(screen.getByText('Explorer')).toBeInTheDocument()
  })

  it('toggles collapse on button click', () => {
    render(
      <LeftPanel>
        <div>child content</div>
      </LeftPanel>,
    )
    const toggleBtn = screen.getByTitle('Collapse panel')
    fireEvent.click(toggleBtn)
    expect(screen.queryByText('child content')).not.toBeInTheDocument()
    expect(screen.getByTitle('Expand panel')).toBeInTheDocument()
  })
})
