import { describe, expect, expectTypeOf, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import {
  SchemaForm,
  type FormSchemaDefinition,
  type FormSchemaField,
} from '@sci-comp/core'
import type { FormSchemaDefinition as PublicFormSchemaDefinition } from '@sci-comp/core'
import { render } from '../../../support/render'

describe('SchemaForm', () => {
  test('re-exports FormSchemaDefinition from the public package entrypoint', () => {
    expectTypeOf<PublicFormSchemaDefinition>().toEqualTypeOf<FormSchemaDefinition>()
  })

  test('renders schema fields and preserves manual composition children', () => {
    const schema = [
      {
        key: 'name',
        name: 'name',
        type: 'input',
        label: 'Name',
      },
    ] satisfies FormSchemaField[]

    render(
      <SchemaForm schema={schema}>
        <button type="submit">Save</button>
      </SchemaForm>,
    )

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  test('accepts schema definitions with fields and component-based entries', () => {
    render(
      <SchemaForm
        schema={{
          fields: [
            {
              name: 'temperature',
              label: 'Temperature',
              component: 'input',
            },
          ],
        }}
      />,
    )

    expect(screen.getByLabelText('Temperature')).toBeInTheDocument()
  })

  test('supports input, textarea, select, and number schema field types', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <SchemaForm
        onFinish={onFinish}
        schema={[
          {
            key: 'title',
            name: 'title',
            type: 'input',
            label: 'Title',
          },
          {
            key: 'description',
            name: 'description',
            type: 'textarea',
            label: 'Description',
          },
          {
            key: 'mode',
            name: 'mode',
            type: 'select',
            label: 'Mode',
            options: [
              { label: 'Auto', value: 'auto' },
              { label: 'Manual', value: 'manual' },
            ],
          },
          {
            key: 'threshold',
            name: 'threshold',
            type: 'number',
            label: 'Threshold',
          },
        ]}
      >
        <button type="submit">Submit</button>
      </SchemaForm>,
    )

    await user.type(
      screen.getByRole('textbox', { name: /title/i }),
      'Detector A',
    )
    await user.type(
      screen.getByRole('textbox', { name: /description/i }),
      'Primary analyzer',
    )
    await user.click(screen.getByRole('combobox', { name: /mode/i }))
    await user.click(await screen.findByText('Manual'))
    await user.clear(screen.getByRole('spinbutton', { name: /threshold/i }))
    await user.type(
      screen.getByRole('spinbutton', { name: /threshold/i }),
      '42',
    )
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onFinish).toHaveBeenCalledWith({
      title: 'Detector A',
      description: 'Primary analyzer',
      mode: 'manual',
      threshold: 42,
    })
  })

  test('uses visibleWhen to drive dependent visibility in the schema path', async () => {
    const user = userEvent.setup()

    render(
      <SchemaForm
        schema={{
          fields: [
            {
              key: 'advancedMode',
              name: 'advancedMode',
              component: 'select',
              label: 'Advanced mode',
              options: [
                { label: 'Disabled', value: 'off' },
                { label: 'Enabled', value: 'on' },
              ],
            },
            {
              key: 'advancedNote',
              name: 'advancedNote',
              component: 'textarea',
              label: 'Advanced note',
              visibleWhen: ({ getValue }) => getValue('advancedMode') === 'on',
            },
          ],
        }}
      />,
    )

    expect(
      screen.queryByRole('textbox', { name: /advanced note/i }),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: /advanced mode/i }))
    await user.click(await screen.findByText('Enabled'))

    expect(
      await screen.findByRole('textbox', { name: /advanced note/i }),
    ).toBeInTheDocument()
  })

  test('uses itemPropsWhen to derive dynamic help and validation rules in the schema path', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <SchemaForm
        onFinish={onFinish}
        schema={{
          fields: [
            {
              key: 'advancedMode',
              name: 'advancedMode',
              component: 'select',
              label: 'Advanced mode',
              options: [
                { label: 'Disabled', value: 'off' },
                { label: 'Enabled', value: 'on' },
              ],
            },
            {
              key: 'advancedNote',
              name: 'advancedNote',
              component: 'textarea',
              label: 'Advanced note',
              itemPropsWhen: ({ getValue }) => {
                const advancedEnabled = getValue('advancedMode') === 'on'

                return advancedEnabled
                  ? {
                      help: 'Required when advanced mode is enabled',
                      required: true,
                    }
                  : {
                      help: 'Optional while advanced mode is disabled',
                    }
              },
            },
          ],
        }}
      >
        <button type="submit">Submit</button>
      </SchemaForm>,
    )

    expect(
      screen.getByText('Optional while advanced mode is disabled'),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('combobox', { name: /advanced mode/i }))
    await user.click(await screen.findByText('Enabled'))

    expect(
      await screen.findByText('Required when advanced mode is enabled'),
    ).toBeInTheDocument()

    const advancedNote = screen.getByRole('textbox', { name: /advanced note/i })
    expect(advancedNote).toHaveAttribute('aria-required', 'true')

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onFinish).not.toHaveBeenCalled()
    expect(advancedNote).toHaveAttribute('aria-invalid', 'true')
  })

  test('supports dynamic list fields in the schema path', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <SchemaForm
        onFinish={onFinish}
        schema={[
          {
            key: 'channels',
            type: 'list',
            name: 'channels',
            label: 'Channels',
            addButtonText: 'Add channel',
            itemLabel: 'Channel',
            fields: [
              {
                key: 'name',
                name: 'name',
                component: 'input',
                label: 'Channel name',
                required: true,
              },
              {
                key: 'gain',
                name: 'gain',
                component: 'number',
                label: 'Gain',
              },
            ],
          },
        ]}
      >
        <button type="submit">Save config</button>
      </SchemaForm>,
    )

    await user.click(screen.getByRole('button', { name: 'Add channel' }))
    await user.type(
      screen.getByRole('textbox', { name: /channel name/i }),
      'Channel A',
    )
    await user.clear(screen.getByRole('spinbutton', { name: /gain/i }))
    await user.type(screen.getByRole('spinbutton', { name: /gain/i }), '7')
    await user.click(screen.getByRole('button', { name: 'Save config' }))

    expect(onFinish).toHaveBeenCalledWith({
      channels: [
        {
          name: 'Channel A',
          gain: 7,
        },
      ],
    })
  })

  test('uses nested item initialValue defaults when adding a new list row', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <SchemaForm
        onFinish={onFinish}
        schema={[
          {
            key: 'channels',
            type: 'list',
            name: 'channels',
            label: 'Channels',
            addButtonText: 'Add channel',
            itemLabel: 'Channel',
            fields: [
              {
                key: 'name',
                name: 'name',
                component: 'input',
                label: 'Channel name',
                initialValue: 'Default channel',
              },
              {
                key: 'gain',
                name: 'gain',
                component: 'number',
                label: 'Gain',
                initialValue: 5,
              },
            ],
          },
        ]}
      >
        <button type="submit">Save config</button>
      </SchemaForm>,
    )

    await user.click(screen.getByRole('button', { name: 'Add channel' }))
    await user.click(screen.getByRole('button', { name: 'Save config' }))

    expect(onFinish).toHaveBeenCalledWith({
      channels: [
        {
          name: 'Default channel',
          gain: 5,
        },
      ],
    })
  })

  test('supports async validator rules in schema fields', async () => {
    const user = userEvent.setup()
    const onFinish = vi.fn()

    render(
      <SchemaForm
        onFinish={onFinish}
        schema={[
          {
            key: 'name',
            name: 'name',
            type: 'input',
            label: 'Name',
            rules: [
              {
                async validator(_, value) {
                  if (value === 'duplicate') {
                    throw new Error('Name already exists')
                  }
                },
              },
            ],
          },
        ]}
      >
        <button type="submit">Submit</button>
      </SchemaForm>,
    )

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'duplicate')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(await screen.findByText('Name already exists')).toBeInTheDocument()
    expect(onFinish).not.toHaveBeenCalled()

    await user.clear(screen.getByRole('textbox', { name: /name/i }))
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'unique')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({ name: 'unique' })
    })
  })

  test('disables add and remove actions when list min/max boundaries are reached', async () => {
    const user = userEvent.setup()

    render(
      <SchemaForm
        schema={[
          {
            key: 'channels',
            type: 'list',
            name: 'channels',
            label: 'Channels',
            addButtonText: 'Add channel',
            removeButtonText: 'Remove channel',
            minItems: 1,
            maxItems: 1,
            initialValue: [{ name: 'Channel A' }],
            fields: [
              {
                key: 'name',
                name: 'name',
                component: 'input',
                label: 'Channel name',
              },
            ],
          },
        ]}
      />,
    )

    expect(screen.getByRole('button', { name: 'Add channel' })).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Remove channel' }),
    ).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'Add channel' }))

    expect(
      screen.getAllByRole('textbox', { name: /channel name/i }),
    ).toHaveLength(1)
  })

  test('can render schema only without children passthrough', () => {
    render(
      <SchemaForm
        schemaOnly
        schema={[
          {
            key: 'operator',
            name: 'operator',
            type: 'input',
            label: 'Operator',
          },
        ]}
      >
        <button type="submit">Hidden action</button>
      </SchemaForm>,
    )

    expect(
      screen.getByRole('textbox', { name: /operator/i }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Hidden action' }),
    ).not.toBeInTheDocument()
  })
})
