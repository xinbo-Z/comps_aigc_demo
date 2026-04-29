import { useRef, useState, type CSSProperties } from 'react'
import { Tabs, type TabsItem, type TabsProps } from '@sci-comp/core'

const panelStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: '1px solid var(--rp-c-divider-light)',
  background: 'var(--rp-c-bg-soft)',
  color: 'var(--rp-c-text-1)',
} as const satisfies CSSProperties

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
} as const

const basicItems: TabsItem[] = [
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

const disabledItems: TabsItem[] = [
  {
    key: 'overview',
    label: '概览',
    children: <div style={panelStyle}>默认进入概览标签页。</div>,
  },
  {
    key: 'history',
    label: '历史记录',
    disabled: true,
    children: <div style={panelStyle}>禁用标签页不会参与切换。</div>,
  },
  {
    key: 'settings',
    label: '配置',
    children: <div style={panelStyle}>切换后查看当前配置内容。</div>,
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

export function TabsBasicPreview() {
  return <Tabs items={basicItems} defaultActiveKey="overview" />
}

export function TabsLazyPreview() {
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

export function TabsEditablePreview() {
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

export function TabsStatePreview() {
  return (
    <div style={stackStyle}>
      <Tabs items={disabledItems} defaultActiveKey="overview" />
    </div>
  )
}
