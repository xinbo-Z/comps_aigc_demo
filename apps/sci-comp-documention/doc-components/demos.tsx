import { useRef, useState, type CSSProperties } from 'react'
import {
  Button,
  Form,
  Input,
  Modal,
  Progress,
  SchemaForm,
  Table,
  Tabs,
  type FormSchemaField,
  type TableColumnsType,
  type TabsItem,
  type TabsProps,
} from '@sci-comp/core'

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
} as const

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
} as const

const panelStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: '1px solid var(--rp-c-divider-light)',
  background: 'var(--rp-c-bg-soft)',
  color: 'var(--rp-c-text-1)',
} as const satisfies CSSProperties

interface TableRow {
  key: string
  name: string
  owner: string
  status: string
}

const tableColumns: TableColumnsType<TableRow> = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '负责人', dataIndex: 'owner', key: 'owner' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const tableData: TableRow[] = [
  { key: '1', name: 'Alpha', owner: '张三', status: '运行中' },
  { key: '2', name: 'Beta', owner: '李四', status: '待验证' },
]

const formSchema: FormSchemaField[] = [
  {
    key: 'name',
    name: 'name',
    type: 'input',
    label: '名称',
    required: true,
    inputProps: {
      placeholder: '请输入组件名称',
    },
  },
  {
    key: 'type',
    name: 'type',
    type: 'select',
    label: '类型',
    options: [
      { label: '基础组件', value: 'basic' },
      { label: '业务组件', value: 'business' },
    ],
    selectProps: {
      placeholder: '请选择组件类型',
      allowClear: true,
    },
  },
]

const tabsItems: TabsItem[] = [
  {
    key: 'overview',
    label: '概览',
    children: <div style={panelStyle}>这里展示组件的概览信息。</div>,
  },
  {
    key: 'detail',
    label: '详情',
    children: (
      <div style={panelStyle}>这里展示更完整的使用说明与配置细节。</div>
    ),
  },
]

const initialEditableItems: TabsItem[] = [
  {
    key: 'overview',
    label: '概览',
    closable: true,
    children: <div style={panelStyle}>概览标签页内容。</div>,
  },
  {
    key: 'detail',
    label: '详情',
    closable: true,
    children: <div style={panelStyle}>详情标签页内容。</div>,
  },
]

export function ButtonDocDemo() {
  return (
    <div style={rowStyle}>
      <Button variant="primary">创建</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">更多操作</Button>
    </div>
  )
}

export function InputDocDemo() {
  return (
    <div style={{ ...stackStyle, maxWidth: '360px' }}>
      <Input
        label="名称"
        helperText="请输入组件名称"
        placeholder="例如：Button"
      />
      <Input
        label="组件编码"
        helperText="编码已存在，请重新输入"
        placeholder="例如：sci-button"
        invalid
      />
    </div>
  )
}

export function TableDocDemo() {
  return (
    <Table
      rowKey="key"
      columns={tableColumns}
      dataSource={tableData}
      pagination={false}
    />
  )
}

export function FormDocDemo() {
  return (
    <Form style={{ maxWidth: '420px' }}>
      <Form.Item label="组件名称" name="name">
        <Input placeholder="请输入组件名称" />
      </Form.Item>
      <Form.Item label="组件描述" name="description">
        <Input placeholder="请输入组件描述" />
      </Form.Item>
      <Button type="submit">提交</Button>
    </Form>
  )
}

export function SchemaFormDocDemo() {
  return (
    <SchemaForm
      schema={formSchema}
      initialValues={{ name: 'Button', type: 'basic' }}
      style={{ maxWidth: '420px' }}
    />
  )
}

export function BasicModalDocDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div style={rowStyle}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <Modal
        open={open}
        title="确认发布"
        okText="确认"
        cancelText="取消"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        请确认当前配置后再继续发布。
      </Modal>
    </div>
  )
}

export function FullscreenModalDocDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div style={rowStyle}>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        打开全屏弹窗
      </Button>
      <Modal
        open={open}
        title="全屏预览"
        fullscreen
        width="100%"
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div style={{ ...panelStyle, minHeight: '180px' }}>
          这里可以承载更大体量的预览内容。
        </div>
      </Modal>
    </div>
  )
}

export function TabsDocDemo() {
  return <Tabs items={tabsItems} defaultActiveKey="overview" />
}

export function LazyTabsDocDemo() {
  const items: TabsItem[] = [
    {
      key: 'overview',
      label: '概览',
      children: <div style={panelStyle}>默认标签页立即渲染。</div>,
    },
    {
      key: 'detail',
      label: '详情',
      children: <div style={panelStyle}>切换到当前标签页后再渲染其内容。</div>,
    },
  ]

  return <Tabs items={items} defaultActiveKey="overview" lazy />
}

export function EditableTabsDocDemo() {
  const [items, setItems] = useState<TabsItem[]>(initialEditableItems)
  const [activeKey, setActiveKey] = useState<string>('overview')
  const indexRef = useRef(3)

  const handleEdit: NonNullable<TabsProps['onEdit']> = (targetKey, action) => {
    if (action === 'add') {
      const nextKey = `tab-${indexRef.current}`
      indexRef.current += 1
      const nextItems: TabsItem[] = [
        ...items,
        {
          key: nextKey,
          label: `新标签 ${indexRef.current - 1}`,
          closable: true,
          children: <div style={panelStyle}>这是新增标签页的内容。</div>,
        },
      ]
      setItems(nextItems)
      setActiveKey(nextKey)
      return
    }

    const removedKey = String(targetKey)
    const removedIndex = items.findIndex(
      (item) => String(item.key) === removedKey,
    )
    const nextItems = items.filter((item) => String(item.key) !== removedKey)

    if (!nextItems.length) {
      return
    }

    setItems(nextItems)

    if (activeKey !== removedKey) {
      return
    }

    const fallbackItem = nextItems[removedIndex - 1] ?? nextItems[0]
    setActiveKey(String(fallbackItem.key))
  }

  return (
    <Tabs
      type="editable-card"
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={handleEdit}
      hideAdd={false}
      lazy={false}
    />
  )
}

export function ProgressDocDemo() {
  return (
    <div style={{ ...stackStyle, width: '100%', maxWidth: '420px' }}>
      <Progress percent={60} />
      <Progress percent={80} status="success" />
      <Progress percent={45} status="active" />
    </div>
  )
}

export function CircleProgressDocDemo() {
  return (
    <div style={rowStyle}>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={45} status="exception" />
    </div>
  )
}

export function DashboardProgressDocDemo() {
  return (
    <div style={rowStyle}>
      <Progress type="dashboard" percent={70} />
      <Progress type="dashboard" percent={55} status="active" />
    </div>
  )
}
