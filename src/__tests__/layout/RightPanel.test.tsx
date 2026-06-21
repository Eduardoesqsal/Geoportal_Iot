import { render, screen, fireEvent } from '@testing-library/react'
import { RightPanel } from '@/presentation/components/layout/RightPanel'

describe('RightPanel', () => {
  it('renders children when not collapsed', () => {
    render(
      <RightPanel>
        <div>dashboard content</div>
      </RightPanel>,
    )
    expect(screen.getByText('dashboard content')).toBeInTheDocument()
    expect(screen.getByText('dashboard content')).toBeVisible()
  })

  it('renders Dashboard heading', () => {
    render(
      <RightPanel>
        <div>child</div>
      </RightPanel>,
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('toggles collapse on button click', () => {
    render(
      <RightPanel>
        <div>content</div>
      </RightPanel>,
    )
    const toggleBtn = screen.getByTitle('Collapse panel')
    fireEvent.click(toggleBtn)
    expect(screen.queryByText('content')).not.toBeInTheDocument()
    expect(screen.getByTitle('Expand panel')).toBeInTheDocument()
  })
})
