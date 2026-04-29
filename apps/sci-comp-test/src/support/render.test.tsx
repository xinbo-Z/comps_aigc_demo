import { describe, expect, it } from 'vitest'
import { render, screen } from './render'

describe('render', () => {
  it('renders children with shared providers', () => {
    const { container } = render(<span>hello</span>)

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveStyle({
      '--sci-color-action-primary': '#1677ff',
      '--accent': '#1677ff',
    })
  })
})
