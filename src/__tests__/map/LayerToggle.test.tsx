import { render, screen, fireEvent } from '@testing-library/react'
import { LayerToggle } from '@/presentation/components/map/LayerToggle'

describe('LayerToggle', () => {
  const defaultProps = {
    showEarthquakes: true,
    onToggleEarthquakes: jest.fn(),
    showWeather: false,
    onToggleWeather: jest.fn(),
  }

  it('renders overlay options', () => {
    render(<LayerToggle {...defaultProps} />)
    expect(screen.getByText('Earthquakes')).toBeInTheDocument()
    expect(screen.getByText('Weather & Air')).toBeInTheDocument()
  })

  it('shows descriptions', () => {
    render(<LayerToggle {...defaultProps} />)
    expect(screen.getByText('USGS significant')).toBeInTheDocument()
    expect(screen.getByText('Open-Meteo + OpenAQ')).toBeInTheDocument()
  })

  it('calls onToggleEarthquakes when clicking earthquakes', () => {
    const onToggleEarthquakes = jest.fn()
    render(<LayerToggle {...defaultProps} onToggleEarthquakes={onToggleEarthquakes} />)
    fireEvent.click(screen.getByText('Earthquakes'))
    expect(onToggleEarthquakes).toHaveBeenCalledWith(false)
  })

  it('calls onToggleWeather when clicking weather', () => {
    const onToggleWeather = jest.fn()
    render(<LayerToggle {...defaultProps} onToggleWeather={onToggleWeather} />)
    fireEvent.click(screen.getByText('Weather & Air'))
    expect(onToggleWeather).toHaveBeenCalledWith(true)
  })
})
