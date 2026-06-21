import { render, screen, fireEvent } from '@testing-library/react'
import { MapControls } from '@/presentation/components/map/MapControls'
import type { BaseMapType } from '@/presentation/components/map/BaseMapSwitcher'

describe('MapControls', () => {
  const defaultProps = {
    baseMap: 'satellite' as BaseMapType,
    onChangeBaseMap: jest.fn(),
    onGeoJsonLoad: jest.fn(),
  }

  it('renders base map switcher', () => {
    render(<MapControls {...defaultProps} />)
    expect(screen.getByTitle('Satellite')).toBeInTheDocument()
    expect(screen.getByTitle('Street')).toBeInTheDocument()
    expect(screen.getByTitle('Dark')).toBeInTheDocument()
  })

  it('renders import polygon button', () => {
    render(<MapControls {...defaultProps} />)
    expect(screen.getByTitle('Import Polygon')).toBeInTheDocument()
  })

  it('opens file drop zone on polygon button click', () => {
    render(<MapControls {...defaultProps} />)
    fireEvent.click(screen.getByTitle('Import Polygon'))
    expect(screen.getByText('Drop GeoJSON here')).toBeInTheDocument()
  })
})
