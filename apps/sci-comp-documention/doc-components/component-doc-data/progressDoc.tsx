import type { ComponentDocPageData } from '../ComponentDoc'
import {
  ProgressCirclePreview,
  ProgressComparePreview,
  ProgressDashboardPreview,
  ProgressLinearPreview,
  ProgressStatusPreview,
} from '../component-doc-previews/progressPreviews'

export const progressDocPage: ComponentDocPageData = {
  title: 'Progress',
  description:
    '`Progress` 是基于 Ant Design Progress 的通用封装组件，用于统一线性、环形与仪表盘等进度反馈的展示方式。',
  definition: [
    '基于 antd Progress 做直接透传封装，优先保持官方心智模型与类型能力。',
    '适合表达任务完成率、状态推进、阶段达成率与紧凑型概览指标。',
    '在 linear / circle / dashboard 三类展示形态之间切换时，继续沿用 antd 原生能力。',
  ],
  scenarios: [
    '上传、发布、同步等需要持续反馈完成率的主流程任务。',
    '卡片、概览区、仪表盘需要展示紧凑型指标时的 circle / dashboard 场景。',
    '通过 status 表达 success / active / exception 等状态差异的流程反馈场景。',
    '同一页面中需要同时对比不同进度形态，以帮助选型的说明文档或管理台场景。',
  ],
  examples: [
    {
      id: 'progress-linear',
      title: '线性进度基础用法',
      summary: '展示默认线性进度条及其在成功、进行中状态下的常见表现。',
      relatedProps: ['percent', 'status'],
      preview: <ProgressLinearPreview />,
      code: `import { Progress } from '@sci-comp/core'

export function ProgressLinearPreview() {
  return (
    <>
      <Progress percent={60} />
      <Progress percent={82} status="success" />
      <Progress percent={45} status="active" />
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '帮助读者快速理解最常见的线性进度条写法，以及 percent 与 status 的组合方式。',
        highlights: [
          '默认线性条最适合主流程任务。',
          '`status` 可直接传入 antd 原生状态值。',
          '适合作为其他进度形态的对照基线。',
        ],
        boundaries: [
          '如果页面空间非常有限，不建议继续强行使用线性条。',
          '当重点是单个概览指标时，circle 或 dashboard 往往更合适。',
        ],
      },
      editorReservation: {
        initialCode: 'ProgressLinearPreview',
        supportedControls: ['percent', 'status'],
      },
    },
    {
      id: 'progress-circle',
      title: '环形进度',
      summary: '用紧凑型 circle 进度条展示单个指标，适合卡片与概览区。',
      relatedProps: ['type', 'percent', 'status'],
      preview: <ProgressCirclePreview />,
      code: `import { Progress } from '@sci-comp/core'

export function ProgressCirclePreview() {
  return (
    <>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={45} status="exception" />
    </>
  )
}`,
      sourceDetails: {
        purpose: '说明在空间受限时，circle 形态如何替代线性条表达完成率。',
        highlights: [
          '通过 `type="circle"` 切换为紧凑概览形态。',
          '保留 antd 原生 percent / status 等高频能力。',
        ],
        boundaries: [
          '如果需要连续显示大量步骤明细，circle 不如线性条直观。',
          '多个 circle 并排时应控制数量，避免页面形成视觉噪音。',
        ],
      },
      editorReservation: {
        initialCode: 'ProgressCirclePreview',
        supportedControls: ['type', 'percent', 'status'],
      },
    },
    {
      id: 'progress-dashboard',
      title: '仪表盘进度',
      summary: '通过 dashboard 形态强调阶段达成率，适合概览统计和目标型指标。',
      relatedProps: ['type', 'percent', 'status'],
      preview: <ProgressDashboardPreview />,
      code: `import { Progress } from '@sci-comp/core'

export function ProgressDashboardPreview() {
  return (
    <>
      <Progress type="dashboard" percent={70} />
      <Progress type="dashboard" percent={55} status="active" />
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '帮助区分 dashboard 与 circle 的使用语义，避免两者被当成纯视觉替换。',
        highlights: [
          'dashboard 更适合强调目标完成率。',
          '在概览类页面里可以与线性条形成层次互补。',
        ],
        boundaries: [
          '如果读者需要精准跟踪执行进度，线性条仍是更直观的主入口。',
          '不要仅因视觉偏好把 dashboard 用到所有进度反馈场景。',
        ],
      },
      editorReservation: {
        initialCode: 'ProgressDashboardPreview',
        supportedControls: ['type', 'percent', 'status'],
      },
    },
    {
      id: 'progress-status',
      title: '状态反馈',
      summary:
        '对比 success、exception 与 active 状态，帮助业务页面统一表达阶段结果。',
      relatedProps: ['status', 'percent'],
      preview: <ProgressStatusPreview />,
      code: `import { Progress } from '@sci-comp/core'

export function ProgressStatusPreview() {
  return (
    <>
      <Progress percent={100} status="success" />
      <Progress percent={48} status="exception" />
      <Progress percent={64} status="active" />
    </>
  )
}`,
      sourceDetails: {
        purpose: '说明 `status` 不只是视觉差异，还承担流程结果表达的职责。',
        highlights: [
          '`success` 适合完成态。',
          '`exception` 适合异常或失败反馈。',
          '`active` 适合进行中状态。',
        ],
        boundaries: [
          '状态语义应和页面中的文案、提示、日志状态保持一致。',
          '不要把状态色当成唯一反馈渠道，必要时应补充说明文案。',
        ],
      },
      editorReservation: {
        initialCode: 'ProgressStatusPreview',
        supportedControls: ['status', 'percent'],
      },
    },
    {
      id: 'progress-comparison',
      title: '组合选型对比',
      summary:
        '把 linear、dashboard、circle 并排展示，帮助在文档页中直接比较不同反馈形态。',
      relatedProps: ['type', 'percent', 'status'],
      preview: <ProgressComparePreview />,
      code: `import { Progress } from '@sci-comp/core'

export function ProgressComparePreview() {
  return (
    <>
      <Progress percent={68} status="active" />
      <Progress type="dashboard" percent={72} />
      <Progress type="circle" percent={84} status="success" />
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '把选型建议前置到案例层，帮助用户直接在视觉上比较不同类型的适配场景。',
        highlights: [
          '线性条适合任务执行。',
          'dashboard 适合阶段达成率。',
          'circle 适合紧凑型指标概览。',
        ],
        boundaries: [
          '组合场景主要用于选型说明，不代表业务页必须同时并列三种进度形态。',
          '真实页面应根据信息层级选择一种主表现形式。',
        ],
      },
      editorReservation: {
        initialCode: 'ProgressComparePreview',
        supportedControls: ['type', 'percent', 'status'],
      },
    },
  ],
  api: [
    {
      name: 'percent',
      description: '当前进度值，决定进度条、环形或仪表盘的展示比例。',
      type: 'number',
      defaultValue: '0',
      notes: '最常用的核心属性。',
    },
    {
      name: 'status',
      description:
        '控制进度条状态表现，常用于 success / exception / active 等反馈。',
      type: "'normal' | 'success' | 'exception' | 'active'",
      defaultValue: "'normal'",
      notes: '来自 antd 透传，但在业务中属于高频使用属性。',
    },
    {
      name: 'type',
      description: '切换进度条呈现方式，用于在线性、环形与仪表盘之间选择。',
      type: "'line' | 'circle' | 'dashboard'",
      defaultValue: "'line'",
      notes: '决定主要的视觉形态与适用场景。',
    },
    {
      name: 'showInfo',
      description: '是否展示默认的进度文本信息。',
      type: 'boolean',
      defaultValue: 'true',
      notes: '信息密度较高的场景可关闭。',
    },
    {
      name: 'strokeColor',
      description: '自定义进度条颜色或渐变色。',
      type: 'string | Record<string, string>',
      defaultValue: '-',
      notes: '透传 antd 原生能力，适合少量视觉强调场景。',
    },
    {
      name: 'size',
      description: '控制进度条在不同类型下的尺寸表现。',
      type: 'number | [number, number] | "small" | "default"',
      defaultValue: "'default'",
      notes: '高频出现在概览卡片和紧凑型布局中。',
    },
  ],
  selectionTips: [
    '默认优先使用线性进度条，适合列表、表单流转和页面主流程反馈。',
    '空间有限时使用 `type="circle"`，更适合卡片与统计概览。',
    '强调目标达成率或阶段指标时使用 `type="dashboard"`。',
  ],
  wrapperNotes: [
    'Progress 当前是对 antd Progress 的直接透传封装，不额外引入新的 DSL 或复杂运行时规则。',
    '第一版 API 表只覆盖业务高频使用属性，不等同于 antd Progress 的全量参数文档。',
    '当需要分步骤流程、复杂任务状态编排或业务规则联动时，应由更高阶组件或业务容器承载，而不是继续扩展基础 Progress wrapper。',
  ],
}
