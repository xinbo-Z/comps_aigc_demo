import { describe, expect, expectTypeOf, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Modal, type ModalProps } from '@sci-comp/core'
import type { ModalProps as PublicModalProps } from '@sci-comp/core'
import { render, screen, waitFor } from '../../../support/render'

describe('Modal', () => {
  test('re-exports ModalProps from the public package entrypoint', () => {
    expectTypeOf<PublicModalProps>().toEqualTypeOf<ModalProps>()
  })

  test('renders the dialog with title and content when open', () => {
    render(
      <Modal open title="Delete item">
        Confirm deletion
      </Modal>,
    )

    expect(screen.getByRole('dialog', { name: 'Delete item' })).toBeInTheDocument()
    expect(screen.getByText('Confirm deletion')).toBeInTheDocument()
  })

  test('triggers onCancel from the cancel button', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(
      <Modal open title="Delete item" onCancel={onCancel}>
        Confirm deletion
      </Modal>,
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  test('renders custom okText and cancelText', () => {
    render(
      <Modal open title="Publish" okText="Confirm" cancelText="Dismiss">
        Ready to publish
      </Modal>,
    )

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })

  test('marks the wrapper when fullscreen is enabled', async () => {
    render(
      <Modal open title="Fullscreen" fullscreen>
        Fullscreen content
      </Modal>,
    )

    await waitFor(() => {
      expect(document.querySelector('[data-fullscreen="true"]')).not.toBeNull()
    })
  })
})
