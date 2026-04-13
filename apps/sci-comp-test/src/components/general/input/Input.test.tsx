import { describe, expect, test } from 'vitest'
import { render, screen } from '../../../support/render'
import { Input } from '@sci-comp/core'

describe('Input', () => {
  test('associates the label and helper text with the input', () => {
    render(
      <Input
        label="Instrument name"
        helperText="Use a unique label for operators."
        id="instrument-name"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Instrument name' })
    const helperText = screen.getByText('Use a unique label for operators.')

    expect(input).toHaveAttribute('id', 'instrument-name')
    expect(helperText).toHaveAttribute('id', 'instrument-name-helper')
    expect(input).toHaveAttribute('aria-describedby', 'instrument-name-helper')
  })

  test('marks the input invalid and exposes helper text as an alert when invalid', () => {
    render(
      <Input
        label="Serial number"
        helperText="Serial number is required."
        invalid
        id="serial-number"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Serial number' })
    const helperText = screen.getByRole('alert')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(helperText).toHaveTextContent('Serial number is required.')
    expect(helperText).toHaveAttribute('id', 'serial-number-helper')
  })

  test('forwards standard input props to the wrapped antd input', () => {
    render(<Input aria-label="Voltage" placeholder="Enter voltage" value="220V" readOnly />)

    const input = screen.getByRole('textbox', { name: 'Voltage' })

    expect(input).toHaveAttribute('placeholder', 'Enter voltage')
    expect(input).toHaveValue('220V')
    expect(input).toHaveAttribute('readonly')
  })

  test('merges external aria-describedby with generated helper text id', () => {
    render(
      <Input
        label="Name"
        helperText="Helpful hint"
        aria-describedby="external-description"
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Name' })
    const describedBy = input.getAttribute('aria-describedby') ?? ''

    expect(describedBy).toContain('external-description')
    expect(describedBy).toMatch(/helper/)
  })
})
