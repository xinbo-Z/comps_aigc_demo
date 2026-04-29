import type { CSSProperties } from 'react'
import { Button, Form, Input, Modal } from '@sci-comp/core'

const stackStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
}

export function ThemePreviewBaseline() {
  return (
    <section style={stackStyle}>
      <h3 style={{ margin: 0 }}>基础组件基准对照</h3>
      <div style={rowStyle}>
        <Button variant="primary">主要操作</Button>
        <Button variant="secondary">次要操作</Button>
        <Button variant="danger">危险操作</Button>
      </div>
      <div style={{ maxWidth: 360 }}>
        <Input label="输入框" placeholder="查看控件高度与圆角" />
      </div>
      <Form style={{ maxWidth: 420 }}>
        <Form.Item label="表单项" name="name">
          <Input placeholder="表单内输入框" />
        </Form.Item>
      </Form>
      <Modal open={false} title="弹窗基准" okText="确认" cancelText="取消">
        弹窗样式基准
      </Modal>
    </section>
  )
}
