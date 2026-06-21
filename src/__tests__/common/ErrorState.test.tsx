import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorState } from '@/presentation/components/common/ErrorState'

describe('ErrorState', () => {
  it('renders default message', () => {
    render(<ErrorState />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<ErrorState message="Custom error" />)
    expect(screen.getByText('Custom error')).toBeInTheDocument()
  })

  it('renders retry button and calls onRetry', () => {
    const onRetry = jest.fn()
    render(<ErrorState onRetry={onRetry} />)
    const btn = screen.getByText('Retry')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when onRetry is undefined', () => {
    render(<ErrorState />)
    expect(screen.queryByText('Retry')).not.toBeInTheDocument()
  })
})
