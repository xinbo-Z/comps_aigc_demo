import type { ComponentDocPageData } from '../ComponentDoc'
import {
  TabsBasicPreview,
  TabsEditablePreview,
  TabsLazyPreview,
  TabsStatePreview,
} from '../component-doc-previews/tabsPreviews'

export const tabsDocPage: ComponentDocPageData = {
  title: 'Tabs',
  description:
    '`Tabs` 是基于 Ant Design Tabs 的通用封装组件，保留标签页切换能力，并通过 `lazy` 补充对内容渲染时机的轻量语义扩展。',
  definition: [
    '基于 antd Tabs 做直接封装，保留 items、activeKey、type 等高频标签页能力。',
    '`lazy` 用于表达未激活面板是否延后到激活后再渲染，而不是引入复杂缓存系统。',
    '适合概览 / 详情切换、面板分组和轻量可编辑标签页等高频场景。',
  ],
  scenarios: [
    '模块化信息展示中的基础标签切换场景。',
    '需要控制未激活内容渲染时机的详情面板场景。',
    '允许用户新增、关闭标签页的可编辑工作区场景。',
    '需要同时表达默认激活项、禁用项等基础状态的场景。',
  ],
  examples: [
    {
      id: 'tabs-basic',
      title: '基础标签切换',
      summary:
        '展示最常见的 tabs 切换写法，帮助快速建立 items 与默认激活项的使用心智。',
      relatedProps: ['items', 'defaultActiveKey'],
      preview: <TabsBasicPreview />,
      code: `import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>这里展示组件的概览信息。</div> },
  { key: 'detail', label: '详情', children: <div>这里展示更完整的使用说明与配置细节。</div> },
]

export function TabsBasicPreview() {
  return <Tabs items={items} defaultActiveKey="overview" />
}`,
      sourceDetails: {
        purpose: '帮助读者确认 Tabs 的主路径仍然围绕 items 和激活项切换展开。',
        highlights: [
          '`items` 是组织标签页内容的核心入口。',
          '`defaultActiveKey` 适合非受控初始激活场景。',
        ],
        boundaries: [
          '如果页面分区非常复杂，不应把所有内容都堆进单层 Tabs。',
          '更深的导航结构应优先考虑路由或更高层级信息架构。',
        ],
      },
      editorReservation: {
        initialCode: 'TabsBasicPreview',
        supportedControls: ['items', 'defaultActiveKey'],
      },
    },
    {
      id: 'tabs-lazy',
      title: 'Lazy 渲染',
      summary:
        '展示 `lazy` 对未激活面板渲染时机的影响，帮助区分它与复杂页面缓存策略的边界。',
      relatedProps: ['lazy', 'items', 'defaultActiveKey'],
      preview: <TabsLazyPreview />,
      code: `import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>默认标签页立即渲染。</div> },
  { key: 'detail', label: '详情', children: <div>切换到当前标签页后再渲染其内容。</div> },
]

export function TabsLazyPreview() {
  return <Tabs items={items} defaultActiveKey="overview" lazy />
}`,
      sourceDetails: {
        purpose:
          '说明 `lazy` 主要解决内容渲染时机问题，而不是承担复杂缓存能力。',
        highlights: [
          '`lazy` 开启时，未激活面板会延后到切换后再渲染。',
          '关闭 `lazy` 时，可通过 antd 的默认渲染方式更早参与内容挂载。',
        ],
        boundaries: [
          '`lazy` 不等于页面级缓存系统。',
          '更复杂的状态保活与缓存策略应由业务容器单独处理。',
        ],
      },
      editorReservation: {
        initialCode: 'TabsLazyPreview',
        supportedControls: ['lazy', 'items', 'defaultActiveKey'],
      },
    },
    {
      id: 'tabs-editable',
      title: '可编辑标签页',
      summary:
        '展示 editable-card 模式下的新增与关闭流程，帮助说明 Tabs 在轻量工作区中的常见用法。',
      relatedProps: ['type', 'onEdit', 'activeKey'],
      preview: <TabsEditablePreview />,
      code: `import { Tabs, type TabsItem, type TabsProps } from '@sci-comp/core'
import { useRef, useState } from 'react'

const initialItems: TabsItem[] = [
  { key: 'overview', label: '概览', closable: true, children: <div>概览标签页内容。</div> },
  { key: 'detail', label: '详情', closable: true, children: <div>详情标签页内容。</div> },
]

export function TabsEditablePreview() {
  const [items, setItems] = useState<TabsItem[]>(initialItems)
  const [activeKey, setActiveKey] = useState<string>('overview')
  const indexRef = useRef(3)

  const handleEdit: NonNullable<TabsProps['onEdit']> = (targetKey, action) => {
    if (action === 'add') {
      const nextKey = 'tab-' + indexRef.current
      indexRef.current += 1
      setItems([
        ...items,
        {
          key: nextKey,
          label: '新标签 ' + (indexRef.current - 1),
          closable: true,
          children: <div>这是新增标签页的内容。</div>,
        },
      ])
      setActiveKey(nextKey)
      return
    }

    const removedKey = String(targetKey)
    const removedIndex = items.findIndex((item) => String(item.key) === removedKey)
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
}`,
      sourceDetails: {
        purpose:
          '说明 Tabs 可以承载轻量动态标签页，但仍保持 antd 原生可编辑模型。',
        highlights: [
          '`type="editable-card"` 适合需要新增和关闭标签的工作区。',
          '受控 `activeKey` 能帮助在动态增删后稳定回收当前状态。',
        ],
        boundaries: [
          '更复杂的多页面缓存、拖拽排序和持久化工作区能力不在第一版主案例范围内。',
          '标签页管理逻辑过重时，应交给更高阶容器处理。',
        ],
      },
      editorReservation: {
        initialCode: 'TabsEditablePreview',
        supportedControls: ['type', 'onEdit', 'activeKey'],
      },
    },
    {
      id: 'tabs-state',
      title: '默认激活项与禁用项',
      summary:
        '展示 defaultActiveKey 与 disabled 项的基础状态表达，帮助说明标签页的高频可用状态。',
      relatedProps: ['defaultActiveKey', 'items'],
      preview: <TabsStatePreview />,
      code: `import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>默认进入概览标签页。</div> },
  { key: 'history', label: '历史记录', disabled: true, children: <div>禁用标签页不会参与切换。</div> },
  { key: 'settings', label: '配置', children: <div>切换后查看当前配置内容。</div> },
]

export function TabsStatePreview() {
  return <Tabs items={items} defaultActiveKey="overview" />
}`,
      sourceDetails: {
        purpose: '帮助读者在最常见的状态控制层面完成 Tabs 基础搭建。',
        highlights: [
          '`defaultActiveKey` 适合指定首次进入时的默认标签。',
          '`disabled` 可直接表达当前不可切换的标签项。',
        ],
        boundaries: [
          '禁用态应有明确业务原因，不应仅作为视觉占位。',
          '如果状态切换与权限强绑定，应在外层同步补充说明。',
        ],
      },
      editorReservation: {
        initialCode: 'TabsStatePreview',
        supportedControls: ['defaultActiveKey', 'items'],
      },
    },
  ],
  api: [
    {
      name: 'items',
      description: '标签页项配置，是组织 label、key 与内容的核心入口。',
      type: 'TabsItem[]',
      defaultValue: '-',
      notes: '沿用 antd Tabs 的主要组织方式。',
    },
    {
      name: 'defaultActiveKey',
      description: '非受控场景下的默认激活标签 key。',
      type: 'string',
      defaultValue: '-',
      notes: '适合最常见的静态切换场景。',
    },
    {
      name: 'activeKey',
      description: '受控模式下的当前激活标签 key。',
      type: 'string',
      defaultValue: '-',
      notes: '动态标签页和复杂联动场景中更常见。',
    },
    {
      name: 'onChange',
      description: '标签切换回调。',
      type: '(activeKey: string) => void',
      defaultValue: '-',
      notes: '用于受控切换或同步外层状态。',
    },
    {
      name: 'type',
      description: '标签页外观类型。',
      type: "'line' | 'card' | 'editable-card'",
      defaultValue: "'line'",
      notes: '可编辑标签页通常使用 `editable-card`。',
    },
    {
      name: 'lazy',
      description: '控制未激活面板是否延后到激活后再渲染。',
      type: 'boolean',
      defaultValue: 'true',
      notes: '解决的是内容渲染时机问题，而不是复杂缓存策略。',
    },
  ],
  selectionTips: [
    '基础信息分组、概览 / 详情切换优先使用 Tabs。',
    '当面板内容较重时，可优先考虑 `lazy` 来控制初始渲染时机。',
    '深度自定义 tab bar、复杂缓存和持久化工作区能力不属于第一版主路径。',
  ],
  wrapperNotes: [
    'Tabs 仍然基于 antd Tabs 实现，未引入独立缓存系统或复杂页面编排模型。',
    'API 主表只覆盖帮助理解 wrapper 和高频切换场景的关键字段，不等同于 antd Tabs 的完整参数面。',
    '深度自定义 tab bar、复杂页面缓存策略等非主路径能力继续遵循 antd 原生能力或业务层扩展方式。',
  ],
}
