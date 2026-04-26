import { Button, Form, Input, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
} as const

const cardStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: `1px solid ${tokens.colorPrimary}1F`,
  background: `${tokens.colorPrimary}08`,
} as const

export function FormBasicPreview() {
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

export function FormLayoutPreview() {
  return (
    <div style={stackStyle}>
      <div style={cardStyle}>
        <Form layout="vertical" style={{ maxWidth: '420px' }}>
          <Form.Item label="组件名称" name="vertical-name">
            <Input placeholder="纵向布局示例" />
          </Form.Item>
          <Form.Item label="负责人" name="vertical-owner">
            <Input placeholder="请输入负责人" />
          </Form.Item>
        </Form>
      </div>
      <div style={cardStyle}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="组件名称" name="horizontal-name">
            <Input placeholder="横向布局示例" />
          </Form.Item>
          <Form.Item label="负责人" name="horizontal-owner">
            <Input placeholder="请输入负责人" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export function FormValidationPreview() {
  return (
    <Form style={{ maxWidth: '420px' }}>
      <Form.Item
        label="组件名称"
        name="name"
        rules={[{ required: true, message: '请输入组件名称' }]}
      >
        <Input placeholder="请输入组件名称" />
      </Form.Item>
      <Form.Item
        label="组件编码"
        name="code"
        rules={[{ required: true, message: '请输入组件编码' }]}
      >
        <Input placeholder="请输入组件编码" />
      </Form.Item>
      <Button type="submit">触发校验</Button>
    </Form>
  )
}

export function FormInitialValuesPreview() {
  return (
    <Form
      style={{ maxWidth: '420px' }}
      initialValues={{ name: 'Button', owner: '组件组' }}
    >
      <Form.Item label="组件名称" name="name">
        <Input placeholder="请输入组件名称" />
      </Form.Item>
      <Form.Item label="负责人" name="owner">
        <Input placeholder="请输入负责人" />
      </Form.Item>
      <Button type="submit">提交默认值</Button>
    </Form>
  )
}
