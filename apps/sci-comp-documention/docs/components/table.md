# Table

`Table` 是基于 Ant Design Table 的通用封装组件，用于列表展示、分页、筛选和排序。

## 使用示例

```tsx
import { Table } from '@sci-comp/core'

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
]

const dataSource = [{ key: '1', name: 'Alpha' }]

export function Example() {
  return <Table rowKey="key" columns={columns} dataSource={dataSource} />
}
```
