import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '@/presentation/components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders default message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<LoadingSpinner message="Fetching sensors..." />)
    expect(screen.getByText('Fetching sensors...')).toBeInTheDocument()
  })

  it('renders spinner element', () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })
})
