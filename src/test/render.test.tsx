import { describe, expect, it } from 'vitest'
import { render, screen } from './render'

describe('render', () => {
  it('renders children with shared providers', () => {
    render(<span>hello</span>)

    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
