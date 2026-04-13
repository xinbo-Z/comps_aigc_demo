# Modal

`Modal` 是基于 Ant Design Modal 的通用封装组件，当前保留 antd 原生弹窗能力，并额外提供 `fullscreen` 语义化扩展。

## 使用示例

```tsx
import { Modal } from '@sci-comp/core'

export function Example() {
  return (
    <Modal open title="确认发布" okText="确认" cancelText="取消">
      请确认当前配置后再继续发布。
    </Modal>
  )
}
```

## Fullscreen 示例

```tsx
import { Modal } from '@sci-comp/core'

export function FullscreenExample() {
  return (
    <Modal open title="全屏预览" fullscreen>
      这里可以承载更大体量的预览内容。
    </Modal>
  )
}
```
