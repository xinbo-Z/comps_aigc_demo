# Form

`Form` 是基于 Ant Design Form 的通用封装组件，支持 schema 驱动方式构建表单。

## 使用示例

```tsx
import { Form } from '@sci-comp/core'

export function Example() {
  return (
    <Form
      schema={[
        { key: 'name', name: 'name', type: 'input', label: '名称' },
      ]}
    />
  )
}
```
