import { describe, expect, expectTypeOf, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { Form, type FormProps } from '@sci-comp/core'
import type { FormProps as PublicFormProps } from '@sci-comp/core'
import { render } from '../../../support/render'

describe('Form', () => {
  test('re-exports FormProps from the public package entrypoint', () => {
    expectTypeOf<PublicFormProps>().toEqualTypeOf<FormProps>()
  })

  test('renders children within the wrapped antd form', () => {
    render(
      <Form>
        <Form.Item label="名称" name="name">
          <input aria-label="名称" />
        </Form.Item>
      </Form>,
    )

    expect(screen.getByRole('textbox', { name: '名称' })).toBeInTheDocument()
  })

  test('uses vertical layout defaults from the wrapper', () => {
    const { container } = render(
      <Form>
        <Form.Item label="名称" name="name">
          <input aria-label="名称" />
        </Form.Item>
      </Form>,
    )

    expect(container.querySelector('.ant-form-vertical')).not.toBeNull()
  })

  test('submits values through the wrapped antd form instance', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <Form onFinish={onFinish} initialValues={{ name: 'Button' }}>
        <Form.Item label="名称" name="name">
          <input aria-label="名称" />
        </Form.Item>
        <button type="submit">提交</button>
      </Form>,
    )

    const input = screen.getByRole('textbox', { name: '名称' })
    await user.clear(input)
    await user.type(input, 'Progress')
    await user.click(screen.getByRole('button', { name: '提交' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ name: 'Progress' })
    })
  })

  test('supports composition with Form.List', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <Form
        onFinish={onFinish}
        initialValues={{ channels: [{ name: '默认通道' }] }}
      >
        <Form.List name="channels">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <Form.Item
                  key={field.key}
                  label="通道名称"
                  name={[field.name, 'name']}
                >
                  <input aria-label={`通道名称-${field.key}`} />
                </Form.Item>
              ))}
              <button type="button" onClick={() => add({ name: '新增通道' })}>
                添加通道
              </button>
            </>
          )}
        </Form.List>
        <button type="submit">保存</button>
      </Form>,
    )

    await user.click(screen.getByRole('button', { name: '添加通道' }))
    await user.click(screen.getByRole('button', { name: '保存' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        channels: [{ name: '默认通道' }, { name: '新增通道' }],
      })
    })
  })
})
