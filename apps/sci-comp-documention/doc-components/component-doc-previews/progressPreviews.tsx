import type { CSSProperties } from 'react'
import { Progress } from '@sci-comp/core'

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
  border: '1px solid var(--rp-c-divider)',
  background: 'var(--rp-c-bg-mute)',
  display: 'grid',
  gap: '12px',
} as const satisfies CSSProperties

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
