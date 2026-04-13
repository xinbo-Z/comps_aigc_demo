import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, within } from '../../../support/render'
import { Table, type TableColumnsType, type TableProps } from '@sci-comp/core'

type TestRow = {
  id: string
  name: string
  status: 'Idle' | 'Running' | 'Maintenance'
  throughput: number
}

const dataSource: TestRow[] = [
  {
    id: '1',
    name: 'Alpha',
    status: 'Running',
    throughput: 24,
  },
  {
    id: '2',
    name: 'Beta',
    status: 'Idle',
    throughput: 12,
  },
  {
    id: '3',
    name: 'Gamma',
    status: 'Maintenance',
    throughput: 8,
  },
]

const columns: TableColumnsType<TestRow> = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'Idle', value: 'Idle' },
      { text: 'Running', value: 'Running' },
      { text: 'Maintenance', value: 'Maintenance' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    key: 'throughput',
    title: 'Throughput',
    dataIndex: 'throughput',
    sorter: (left, right) => left.throughput - right.throughput,
  },
]

const originalResizeObserver = globalThis.ResizeObserver

beforeAll(() => {
  class ResizeObserverMock {
    observe() {
      return undefined
    }

    unobserve() {
      return undefined
    }

    disconnect() {
      return undefined
    }
  }

  globalThis.ResizeObserver = ResizeObserverMock
})

afterAll(() => {
  globalThis.ResizeObserver = originalResizeObserver
})

afterEach(() => {
  vi.doUnmock('antd')
})

describe('Table', () => {
  test('renders the empty state and supports custom cell rendering', () => {
    const { rerender, container } = render(
      <Table<TestRow> columns={[]} dataSource={[]} rowKey="id" />,
    )

    expect(screen.getByRole('cell', { name: /no data/i })).toBeInTheDocument()

    const renderColumns: TableColumnsType<TestRow> = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value) => <strong>{value}</strong>,
      },
    ]

    rerender(
      <Table<TestRow>
        columns={renderColumns}
        dataSource={[{ id: '1', name: 'Alpha', status: 'Running', throughput: 24 }]}
        rowKey="id"
      />,
    )

    const renderedValue = screen.getByText('Alpha')

    expect(renderedValue.tagName).toBe('STRONG')
    expect(container.querySelector('strong')).toHaveTextContent('Alpha')
  })

  test('renders row selection UI and notifies when the checked state changes', async () => {
    const user = userEvent.setup()
    const onSelectionChange = vi.fn()

    render(
      <Table<TestRow>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        rowSelection={{ onChange: onSelectionChange }}
      />,
    )

    const rowCheckboxes = screen.getAllByRole('checkbox')
    const firstRowCheckbox = rowCheckboxes[1]

    expect(firstRowCheckbox).not.toBeChecked()

    await user.click(firstRowCheckbox)

    expect(firstRowCheckbox).toBeChecked()
    expect(onSelectionChange).toHaveBeenCalledWith(
      ['1'],
      [expect.objectContaining({ id: '1', name: 'Alpha' })],
      expect.objectContaining({ type: 'single' }),
    )
  })

  test('exposes sorter changes through the table onChange callback', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn<NonNullable<TableProps<TestRow>['onChange']>>()

    render(
      <Table<TestRow>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        onChange={onChange}
      />,
    )

    await user.click(screen.getByText('Throughput'))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })

    const sorterCall = onChange.mock.calls.at(-1)

    expect(sorterCall?.[2]).toEqual(
      expect.objectContaining({
        columnKey: 'throughput',
        field: 'throughput',
        order: 'ascend',
      }),
    )
  })

  test('exposes filter changes through the table onChange callback', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn<NonNullable<TableProps<TestRow>['onChange']>>()

    render(
      <Table<TestRow>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        onChange={onChange}
      />,
    )

    const statusHeader = screen.getByRole('columnheader', { name: /status/i })
    const filterTrigger = within(statusHeader).getByRole('button')

    await user.click(filterTrigger)

    const runningFilterOption = (await screen.findAllByText('Running')).at(-1)

    expect(runningFilterOption).toBeDefined()

    await user.click(runningFilterOption!)
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
    })

    const filterCall = onChange.mock.calls.at(-1)

    expect(filterCall?.[1]).toMatchObject({ status: ['Running'] })
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument()
  })

  test('renders pagination controls and updates the visible rows when the page changes', async () => {
    const user = userEvent.setup()

    render(
      <Table<TestRow>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{ pageSize: 2, showSizeChanger: false }}
      />,
    )

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument()

    await user.click(screen.getByTitle('2'))

    await waitFor(() => {
      expect(screen.getByText('Gamma')).toBeInTheDocument()
    })

    expect(screen.queryByText('Alpha')).not.toBeInTheDocument()
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()
  })

  test('maps virtualScroll to Ant Design virtual and scroll props', async () => {
    vi.resetModules()
    vi.doMock('antd', async () => {
      const actual = await vi.importActual<typeof import('antd')>('antd')

      return {
        ...actual,
        Table: ({
          scroll,
          virtual,
        }: {
          scroll?: { x?: string | number | true; y?: string | number }
          virtual?: boolean
        }) => (
          <div
            data-scroll-x={String(scroll?.x ?? '')}
            data-scroll-y={String(scroll?.y ?? '')}
            data-virtual={String(Boolean(virtual))}
          />
        ),
      }
    })

    const { Table: MockedTable } = await import('@sci-comp/core')
    const { container } = render(
      <MockedTable<TestRow>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        scroll={{ x: 640 }}
        virtualScroll={{ x: 720, y: 240 }}
      />,
    )

    const tableRoot = container.firstElementChild

    expect(tableRoot).toHaveAttribute('data-virtual', 'true')
    expect(tableRoot).toHaveAttribute('data-scroll-x', '720')
    expect(tableRoot).toHaveAttribute('data-scroll-y', '240')
  })
})
