import { Button, Progress, createThemeTokens } from '@sci-comp/core'

const tokens = createThemeTokens()

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
} as const

const buttonBlockStyle = {
  ...rowStyle,
  width: '100%',
} as const

const progressStackStyle = {
  ...stackStyle,
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

export function ButtonVariantPreview() {
  return (
    <div style={buttonBlockStyle}>
      <Button variant="primary">立即创建</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">更多操作</Button>
      <Button variant="text">稍后处理</Button>
    </div>
  )
}

export function ButtonDangerPreview() {
  return (
    <div style={buttonBlockStyle}>
      <Button variant="danger">删除资源</Button>
      <Button variant="danger" disabled>
        已禁用删除
      </Button>
      <Button variant="secondary">取消</Button>
    </div>
  )
}

export function ButtonSizePreview() {
  return (
    <div style={buttonBlockStyle}>
      <Button variant="primary" size="sm">
        小按钮
      </Button>
      <Button variant="primary" size="md">
        默认按钮
      </Button>
      <Button variant="primary" size="lg">
        大按钮
      </Button>
    </div>
  )
}

export function ButtonLoadingPreview() {
  return (
    <div style={buttonBlockStyle}>
      <Button variant="primary" loading>
        提交中
      </Button>
      <Button variant="secondary" disabled>
        已锁定
      </Button>
      <Button variant="ghost">返回列表</Button>
    </div>
  )
}

export function ButtonToolbarPreview() {
  return (
    <div style={{ ...stackStyle, width: '100%', gap: '20px' }}>
      <div style={comparePanelStyle}>
        <div style={compareCardStyle}>
          <strong>主流程动作</strong>
          <div style={buttonBlockStyle}>
            <Button variant="primary">发布版本</Button>
            <Button variant="secondary">保存草稿</Button>
          </div>
        </div>
        <div style={compareCardStyle}>
          <strong>风险动作</strong>
          <div style={buttonBlockStyle}>
            <Button variant="ghost">导出记录</Button>
            <Button variant="danger">删除版本</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProgressLinearPreview() {
  return (
    <div style={progressStackStyle}>
      <Progress percent={60} />
      <Progress percent={82} status="success" />
      <Progress percent={45} status="active" />
    </div>
  )
}

export function ProgressCirclePreview() {
  return (
    <div style={rowStyle}>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={45} status="exception" />
    </div>
  )
}

export function ProgressDashboardPreview() {
  return (
    <div style={rowStyle}>
      <Progress type="dashboard" percent={70} />
      <Progress type="dashboard" percent={55} status="active" />
    </div>
  )
}

export function ProgressStatusPreview() {
  return (
    <div style={progressStackStyle}>
      <Progress percent={100} status="success" />
      <Progress percent={48} status="exception" />
      <Progress percent={64} status="active" />
    </div>
  )
}

export function ProgressComparePreview() {
  return (
    <div style={comparePanelStyle}>
      <div style={compareCardStyle}>
        <strong>任务执行</strong>
        <Progress percent={68} status="active" />
      </div>
      <div style={compareCardStyle}>
        <strong>阶段达成率</strong>
        <Progress type="dashboard" percent={72} />
      </div>
      <div style={compareCardStyle}>
        <strong>紧凑概览</strong>
        <Progress type="circle" percent={84} status="success" />
      </div>
    </div>
  )
}
