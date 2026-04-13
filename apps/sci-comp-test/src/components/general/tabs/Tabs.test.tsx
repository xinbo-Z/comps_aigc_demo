import { describe, expect, expectTypeOf, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Tabs, type TabsProps } from '@sci-comp/core'
import type { TabsProps as PublicTabsProps } from '@sci-comp/core'
import { render, screen } from '../../../support/render'

describe('Tabs', () => {
  test('re-exports TabsProps from the public package entrypoint', () => {
    expectTypeOf<PublicTabsProps>().toEqualTypeOf<TabsProps>()
  })

  test('renders tabs and the active panel content', () => {
    render(
      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: <div>Overview panel</div> },
          { key: 'detail', label: 'Detail', children: <div>Detail panel</div> },
        ]}
        defaultActiveKey="overview"
      />,
    )

    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Detail' })).toBeInTheDocument()
    expect(screen.getByText('Overview panel')).toBeInTheDocument()
  })

  test('forwards onChange when a tab is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: <div>Overview panel</div> },
          { key: 'detail', label: 'Detail', children: <div>Detail panel</div> },
        ]}
        defaultActiveKey="overview"
        onChange={onChange}
      />,
    )

    await user.click(screen.getByRole('tab', { name: 'Detail' }))

    expect(onChange).toHaveBeenCalledWith('detail')
    expect(screen.getByText('Detail panel')).toBeInTheDocument()
  })

  test('lazily renders inactive content when lazy is enabled', async () => {
    const user = userEvent.setup()

    render(
      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: <div>Overview panel</div> },
          { key: 'detail', label: 'Detail', children: <div>Detail panel</div> },
        ]}
        defaultActiveKey="overview"
        lazy
      />,
    )

    expect(screen.getByText('Overview panel')).toBeInTheDocument()
    expect(screen.queryByText('Detail panel')).not.toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Detail' }))

    expect(screen.getByText('Detail panel')).toBeInTheDocument()
  })

  test('pre-renders inactive content when lazy is disabled', () => {
    render(
      <Tabs
        items={[
          { key: 'overview', label: 'Overview', children: <div>Overview panel</div> },
          { key: 'detail', label: 'Detail', children: <div>Detail panel</div> },
        ]}
        defaultActiveKey="overview"
        lazy={false}
      />,
    )

    expect(screen.getByText('Overview panel')).toBeInTheDocument()
    expect(screen.getByText('Detail panel')).toBeInTheDocument()
  })

  test('forwards editable-card remove actions to onEdit', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const { container } = render(
      <Tabs
        type="editable-card"
        onEdit={onEdit}
        items={[
          {
            key: 'overview',
            label: 'Overview',
            children: <div>Overview panel</div>,
            closable: true,
          },
          {
            key: 'detail',
            label: 'Detail',
            children: <div>Detail panel</div>,
            closable: true,
          },
        ]}
        defaultActiveKey="overview"
      />,
    )

    const closeButtons = container.querySelectorAll('.ant-tabs-tab-remove')
    expect(closeButtons.length).toBeGreaterThan(0)

    await user.click(closeButtons[0] as HTMLElement)

    expect(onEdit).toHaveBeenCalledWith('overview', 'remove')
  })
})
