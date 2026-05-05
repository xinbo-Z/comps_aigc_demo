## 组件导航

本页为 @sci-comp/core 组件库的组件导航入口，列出了当前可用的所有组件及其功能说明。

## 组件列表

### 通用组件

- **Button** - 按钮组件，提供多种样式变体和尺寸
- **Input** - 输入框组件，支持标签、辅助文字和错误状态
- **Form** - 表单组件，基于 Ant Design Form 封装
- **SchemaForm** - 基于 JSON Schema 的表单组件
- **Modal** - 弹窗组件，支持多种场景的模态框
- **Table** - 表格组件，用于展示结构化数据
- **Tabs** - 标签页组件，支持切换不同内容区域
- **Progress** - 进度条组件，显示操作进度

## 快速示例

### 使用 Button 组件

```tsx
import { Button } from '@sci-comp/core'

function Example() {
  return (
    <>
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>
    </>
  )
}
```

### 使用 Input 组件

```tsx
import { Input } from '@sci-comp/core'

function Example() {
  return (
    <Input label="用户名" helperText="请输入您的用户名" placeholder="请输入" />
  )
}
```

## 下一步

- 查看 [Button](/components/button) 组件文档，了解按钮的完整用法
- 查看 [Input](/components/input) 组件文档，了解输入框的完整用法
- 查看 [Form](/components/form) 组件文档，了解表单的完整用法
