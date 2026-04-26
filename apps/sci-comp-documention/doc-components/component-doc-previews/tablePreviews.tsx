import { Table, createThemeTokens, type TableColumnsType } from '@sci-comp/core'

const tokens = createThemeTokens()

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
} as const

const panelStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: `1px solid ${tokens.colorPrimary}1F`,
  background: `${tokens.colorPrimary}08`,
  color: tokens.colorText,
} as const

interface TableRow {
  key: string
  name: string
  owner: string
  status: string
}

const baseColumns: TableColumnsType<TableRow> = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '负责人', dataIndex: 'owner', key: 'owner' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const baseData: TableRow[] = [
  { key: '1', name: 'Alpha', owner: '张三', status: '运行中' },
  { key: '2', name: 'Beta', owner: '李四', status: '待验证' },
]

const pagedData: TableRow[] = Array.from({ length: 8 }, (_, index) => ({
  key: String(index + 1),
  name: `组件 ${index + 1}`,
  owner: index % 2 === 0 ? '张三' : '李四',
  status: index % 3 === 0 ? '已发布' : '开发中',
}))

const longColumns: TableColumnsType<TableRow> = [
  ...baseColumns,
  { title: '最近更新', dataIndex: 'status', key: 'updatedAt' },
  { title: '环境', dataIndex: 'owner', key: 'environment' },
]

const virtualData: TableRow[] = Array.from({ length: 24 }, (_, index) => ({
  key: String(index + 1),
  name: `虚拟列表项 ${index + 1}`,
  owner: index % 2 === 0 ? '平台组' : '组件组',
  status: index % 4 === 0 ? '已完成' : '处理中',
}))

export function TableBasicPreview() {
  return (
    <Table
      rowKey="key"
      columns={baseColumns}
      dataSource={baseData}
      pagination={false}
    />
  )
}

export function TablePaginationPreview() {
  return (
    <Table
      rowKey="key"
      columns={baseColumns}
      dataSource={pagedData}
      pagination={{ pageSize: 4, showSizeChanger: false }}
    />
  )
}

export function TableEmptyPreview() {
  return (
    <div style={stackStyle}>
      <Table
        rowKey="key"
        columns={baseColumns}
        dataSource={[]}
        pagination={false}
        locale={{
          emptyText: '当前筛选条件下还没有可展示的列表内容。',
        }}
      />
    </div>
  )
}

export function TableScrollPreview() {
  return (
    <div style={stackStyle}>
      <Table
        rowKey="key"
        columns={longColumns}
        dataSource={pagedData}
        pagination={false}
        scroll={{ x: 720 }}
      />
      <div style={panelStyle}>通过 scroll.x 维持宽表格的横向可读性。</div>
    </div>
  )
}

export function TableVirtualPreview() {
  return (
    <div style={stackStyle}>
      <Table
        rowKey="key"
        columns={baseColumns}
        dataSource={virtualData}
        pagination={false}
        virtualScroll={{ y: 280 }}
      />
      <div style={panelStyle}>
        virtualScroll 通过语义化配置接入 antd 原生虚拟滚动能力。
      </div>
    </div>
  )
}
