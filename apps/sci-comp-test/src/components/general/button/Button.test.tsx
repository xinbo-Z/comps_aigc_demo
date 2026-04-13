import { describe, expect, test } from 'vitest'
import { render, screen } from '../../../support/render'
import { Button } from '@sci-comp/core'

describe('Button', () => {
  test('renders the provided icon with the label when not loading', () => {
    render(
      <Button icon={<span data-testid="button-icon">+</span>}>
        Create
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create' })

    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
    expect(button).toContainElement(screen.getByTestId('button-icon'))
  })

  test('disables the button when loading', () => {
    render(<Button loading>Submit</Button>)

    expect(screen.getByRole('button')).toBeDisabled()
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

  test('maps the native button type to antd htmlType', () => {
    render(<Button type="submit">Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })

    expect(button).toHaveAttribute('type', 'submit')
  })
})
