import { render, screen } from '@testing-library/react'
import { EmptyState } from '@/presentation/components/common/EmptyState'

describe('EmptyState', () => {
  it('renders default title and description', () => {
    render(<EmptyState />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
    expect(screen.getByText('There are no sensors to display.')).toBeInTheDocument()
  })

  it('renders custom title and description', () => {
    render(<EmptyState title="Custom title" description="Custom description" />)
    expect(screen.getByText('Custom title')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
  })
})
