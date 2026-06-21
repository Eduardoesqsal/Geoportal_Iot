import { render, screen, fireEvent } from '@testing-library/react'
import { SensorList } from '@/presentation/components/sensor/SensorList'
import type { Sensor } from '@/domain/entities/Sensor'

const mockSensors: Sensor[] = [
  {
    id: 'SEN-001',
    name: 'Sensor Norte',
    status: 'online',
    location: { lat: 20.39, lng: -99.99 },
    metrics: { temperature: 24.3, humidity: 58, pressure: 1013 },
    lastUpdated: '2026-06-21T10:30:00Z',
  },
  {
    id: 'SEN-002',
    name: 'Sensor Centro',
    status: 'warning',
    location: { lat: 20.45, lng: -99.85 },
    metrics: { temperature: 28.1, humidity: 45 },
    lastUpdated: '2026-06-21T10:28:00Z',
  },
  {
    id: 'SEN-003',
    name: 'Sensor Sur',
    status: 'offline',
    location: { lat: 20.18, lng: -99.95 },
    metrics: { temperature: 0, humidity: 0 },
    lastUpdated: '2026-06-20T22:00:00Z',
  },
]

describe('SensorList', () => {
  const defaultProps = {
    sensors: mockSensors,
    selectedId: null,
    onSelect: jest.fn(),
    isLoading: false,
  }

  it('renders all sensors', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.getByText('Sensor Norte')).toBeInTheDocument()
    expect(screen.getByText('Sensor Centro')).toBeInTheDocument()
    expect(screen.getByText('Sensor Sur')).toBeInTheDocument()
  })

  it('shows sensor IDs', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.getByText('SEN-001')).toBeInTheDocument()
    expect(screen.getByText('SEN-002')).toBeInTheDocument()
    expect(screen.getByText('SEN-003')).toBeInTheDocument()
  })

  it('shows temperature for each sensor', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.getByText('24.3°C')).toBeInTheDocument()
    expect(screen.getByText('28.1°C')).toBeInTheDocument()
    expect(screen.getByText('0.0°C')).toBeInTheDocument()
  })

  it('shows humidity for each sensor', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.getByText('58%')).toBeInTheDocument()
    expect(screen.getByText('45%')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('shows status badge for non-online sensors', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.getByText('warning')).toBeInTheDocument()
    expect(screen.getByText('offline')).toBeInTheDocument()
  })

  it('hides online status badge', () => {
    render(<SensorList {...defaultProps} />)
    expect(screen.queryByText('online')).not.toBeInTheDocument()
  })

  it('calls onSelect when clicking a sensor', () => {
    const onSelect = jest.fn()
    render(<SensorList {...defaultProps} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('Sensor Norte'))
    expect(onSelect).toHaveBeenCalledWith('SEN-001')
  })

  it('shows loading spinner when isLoading is true', () => {
    render(<SensorList {...defaultProps} isLoading={true} sensors={[]} />)
    expect(screen.getByText('Loading sensors...')).toBeInTheDocument()
  })

  it('shows empty state when no sensors', () => {
    render(<SensorList {...defaultProps} sensors={[]} />)
    expect(screen.getByText('No sensors')).toBeInTheDocument()
    expect(screen.getByText('No sensors match your filters.')).toBeInTheDocument()
  })
})
