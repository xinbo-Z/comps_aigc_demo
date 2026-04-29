import type { CSSProperties } from 'react'
import { Button, Input, Progress, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}

const toolbarStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  alignItems: 'center',
}

const panelStyle: CSSProperties = {
  padding: 20,
  borderRadius: 20,
  border: `1px solid ${tokens.colorBorderBase}`,
  background: 'var(--sci-color-surface-elevated)',
}

export function ThemePreviewWorkbench() {
  return (
    <section style={wrapperStyle}>
      <h3 style={{ margin: 0 }}>业务化预览</h3>
      <div style={panelStyle}>
        <div style={toolbarStyle}>
          <Button variant="primary">发布组件</Button>
          <Button variant="secondary">保存草稿</Button>
          <Button variant="ghost">更多操作</Button>
        </div>
        <div style={{ marginTop: 16, maxWidth: 360 }}>
          <Input
            label="组件名称"
            placeholder="请输入组件名称"
            helperText="同一份 overrides 会同时影响这里的输入框与按钮。"
          />
        </div>
        <div style={{ marginTop: 16, maxWidth: 360 }}>
          <Progress percent={72} />
        </div>
      </div>
    </section>
  )
}
