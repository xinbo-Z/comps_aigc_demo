import { Input, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '420px',
} as const

const comparePanelStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '16px',
  width: '100%',
} as const

const compareCardStyle = {
  padding: '16px',
  borderRadius: '16px',
  border: `1px solid ${tokens.colorPrimary}20`,
  background: `${tokens.colorPrimary}08`,
  display: 'grid',
  gap: '12px',
} as const

export function InputBasicPreview() {
  return (
    <div style={stackStyle}>
      <Input placeholder="请输入组件名称" />
      <Input placeholder="请输入资源编码" />
    </div>
  )
}

export function InputLabeledPreview() {
  return (
    <div style={stackStyle}>
      <Input
        label="组件名称"
        helperText="请输入对外展示的组件名称"
        placeholder="例如：Button"
      />
      <Input
        label="组件编码"
        helperText="编码将用于包内注册与页面路由展示"
        placeholder="例如：sci-button"
      />
    </div>
  )
}

export function InputValidationPreview() {
  return (
    <div style={stackStyle}>
      <Input
        label="组件编码"
        helperText="编码已存在，请重新输入"
        placeholder="例如：sci-button"
        invalid
      />
      <Input
        label="发布说明"
        helperText="请输入本次变更的用途说明"
        placeholder="请输入发布说明"
      />
    </div>
  )
}

export function InputReadonlyPreview() {
  return (
    <div style={comparePanelStyle}>
      <div style={compareCardStyle}>
        <strong>禁用态</strong>
        <Input
          label="当前负责人"
          helperText="当前阶段暂不允许修改"
          value="张三"
          disabled
        />
      </div>
      <div style={compareCardStyle}>
        <strong>只读态</strong>
        <Input
          label="发布版本"
          helperText="版本号由系统生成，仅支持查看"
          value="v2.3.0"
          readOnly
        />
      </div>
    </div>
  )
}
