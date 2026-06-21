import { render, screen, fireEvent } from '@testing-library/react'
import { SensorFilter } from '@/presentation/components/sensor/SensorFilter'

describe('SensorFilter', () => {
  const defaultProps = {
    search: '',
    onSearchChange: jest.fn(),
    statusFilter: 'all' as const,
    onStatusChange: jest.fn(),
  }

  it('renders search input', () => {
    render(<SensorFilter {...defaultProps} />)
    expect(screen.getByPlaceholderText('Search sensors...')).toBeInTheDocument()
  })

  it('renders all status filter buttons', () => {
    render(<SensorFilter {...defaultProps} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
    expect(screen.getByText('Offline')).toBeInTheDocument()
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('calls onSearchChange on input change', () => {
    const onSearchChange = jest.fn()
    render(<SensorFilter {...defaultProps} onSearchChange={onSearchChange} />)
    const input = screen.getByPlaceholderText('Search sensors...')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(onSearchChange).toHaveBeenCalledWith('test')
  })

  it('calls onStatusChange when a status button is clicked', () => {
    const onStatusChange = jest.fn()
    render(<SensorFilter {...defaultProps} onStatusChange={onStatusChange} />)
    fireEvent.click(screen.getByText('Online'))
    expect(onStatusChange).toHaveBeenCalledWith('online')
  })

  it('highlights the active status filter', () => {
    render(<SensorFilter {...defaultProps} statusFilter="online" />)
    const btn = screen.getByText('Online')
    expect(btn.className).toContain('accent')
  })
})
