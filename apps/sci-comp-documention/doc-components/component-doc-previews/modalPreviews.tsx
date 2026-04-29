import { useState, type CSSProperties } from 'react'
import { Button, Form, Input, Modal } from '@sci-comp/core'

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  alignItems: 'center',
} as const

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
} as const

const panelStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: '1px solid var(--rp-c-divider-light)',
  background: 'var(--rp-c-bg-soft)',
  color: 'var(--rp-c-text-1)',
} as const satisfies CSSProperties

export function ModalBasicPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div style={rowStyle}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        打开基础弹窗
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

export function ModalFullscreenPreview() {
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

export function ModalFormPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div style={rowStyle}>
      <Button variant="primary" onClick={() => setOpen(true)}>
        打开表单弹窗
      </Button>
      <Modal
        open={open}
        title="创建组件"
        okText="提交"
        cancelText="取消"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Form style={{ maxWidth: '420px' }}>
          <Form.Item label="组件名称" name="name">
            <Input placeholder="请输入组件名称" />
          </Form.Item>
          <Form.Item label="组件编码" name="code">
            <Input placeholder="请输入组件编码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export function ModalLoadingPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div style={stackStyle}>
      <div style={rowStyle}>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          打开确认弹窗
        </Button>
      </div>
      <Modal
        open={open}
        title="确认提交"
        okText="提交中"
        cancelText="取消"
        confirmLoading
        onCancel={() => setOpen(false)}
      >
        当前示例用于演示提交中状态下的确认按钮反馈。
      </Modal>
      <div style={panelStyle}>
        点击按钮后可查看 confirmLoading 状态的确认弹窗。
      </div>
    </div>
  )
}
