import { render, screen } from '@testing-library/react'
import { Header } from '@/presentation/components/layout/Header'

describe('Header', () => {
  it('renders default title', () => {
    render(<Header />)
    expect(screen.getByText('GeoPortal IoT')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<Header title="Custom Title" />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })
})
