import { describe, expect, test } from 'vitest'
import { render, screen } from '../../../test/render'
import { Button } from './Button'

describe('Button', () => {
  test('renders the provided icon before the label when not loading', () => {
    render(
      <Button icon={<span data-testid="button-icon">+</span>}>
        Create
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create' })

    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
    expect(button.firstElementChild).toHaveAttribute('data-testid', 'button-icon')
  })

  test('disables the button and shows a loading indicator when loading', () => {
    render(<Button loading>Submit</Button>)

    const button = screen.getByRole('button', { name: 'Submit' })

    expect(button).toBeDisabled()
    expect(screen.getByTestId('button-loading-indicator')).toBeInTheDocument()
  })

  test('merges a consumer className with the button variant and size classes', () => {
    render(
      <Button className="consumer-class" variant="danger" size="lg">
        Delete
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Delete' })

    expect(button).toHaveClass('consumer-class')
  })
})
