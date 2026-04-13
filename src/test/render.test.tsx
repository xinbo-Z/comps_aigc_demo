import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TestProviders } from './render'

describe('TestProviders', () => {
  it('renders children', () => {
    render(
      <TestProviders>
        <span>hello</span>
      </TestProviders>,
    )

    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})
