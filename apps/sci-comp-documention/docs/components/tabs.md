# Tabs

`Tabs` 是基于 Ant Design Tabs 的通用封装组件，当前保留 antd 原生标签页能力，并额外提供 `lazy` 语义化扩展。

## 使用示例

```tsx
import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>概览内容</div> },
  { key: 'detail', label: '详情', children: <div>详情内容</div> },
]

export function Example() {
  return <Tabs items={items} defaultActiveKey="overview" />
}
```

## Lazy 示例

```tsx
import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>概览内容</div> },
  { key: 'detail', label: '详情', children: <div>详情内容</div> },
]

export function LazyExample() {
  return <Tabs items={items} defaultActiveKey="overview" lazy />
}
```

## Editable 示例

```tsx
import { Tabs } from '@sci-comp/core'

const items = [
  { key: 'overview', label: '概览', children: <div>概览内容</div>, closable: true },
  { key: 'detail', label: '详情', children: <div>详情内容</div>, closable: true },
]

export function EditableExample() {
  return <Tabs items={items} type="editable-card" onEdit={() => {}} />
}
```
