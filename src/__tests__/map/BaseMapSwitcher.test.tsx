import { render, screen, fireEvent } from '@testing-library/react'
import { BaseMapSwitcher } from '@/presentation/components/map/BaseMapSwitcher'
import type { BaseMapType } from '@/presentation/components/map/BaseMapSwitcher'

describe('BaseMapSwitcher', () => {
  const defaultProps = {
    current: 'satellite' as BaseMapType,
    onChange: jest.fn(),
  }

  it('renders all base map options', () => {
    render(<BaseMapSwitcher {...defaultProps} />)
    expect(screen.getByTitle('Satellite')).toBeInTheDocument()
    expect(screen.getByTitle('Street')).toBeInTheDocument()
    expect(screen.getByTitle('Dark')).toBeInTheDocument()
  })

  it('calls onChange with the correct map type on click', () => {
    const onChange = jest.fn()
    render(<BaseMapSwitcher {...defaultProps} onChange={onChange} />)
    fireEvent.click(screen.getByTitle('Street'))
    expect(onChange).toHaveBeenCalledWith('street')
    fireEvent.click(screen.getByTitle('Dark'))
    expect(onChange).toHaveBeenCalledWith('dark')
  })

  it('highlights the active map type', () => {
    const { container } = render(<BaseMapSwitcher {...defaultProps} current="street" />)
    const buttons = container.querySelectorAll('button')
    expect(buttons[1].className).toContain('graphite-900')
  })
})
