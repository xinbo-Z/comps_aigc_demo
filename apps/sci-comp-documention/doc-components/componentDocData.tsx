import type { ComponentDocPageData } from './ComponentDoc'
import {
  ButtonDangerPreview,
  ButtonLoadingPreview,
  ButtonSizePreview,
  ButtonToolbarPreview,
  ButtonVariantPreview,
  ProgressCirclePreview,
  ProgressComparePreview,
  ProgressDashboardPreview,
  ProgressLinearPreview,
  ProgressStatusPreview,
} from './componentDocPreviews'

export const buttonDocPage: ComponentDocPageData = {
  title: 'Button',
  description:
    '`Button` 是基于 Ant Design Button 的通用封装组件，用于统一主次操作、风险动作与状态反馈的表达方式。',
  definition: [
    '基于 antd Button 做轻量 wrapper，保留原生按钮的主要交互能力。',
    '通过 `variant` 与 `size` 提供更贴近业务语义的使用方式，减少在页面里反复映射 antd `type`。',
    '适合承载页面主操作、次操作、轻量操作与风险动作，不引入偏离 antd 心智模型的大量新增行为。',
  ],
  scenarios: [
    '页面主流程提交、创建、发布等需要突出优先级的动作。',
    '列表工具栏、表单页脚、弹窗确认区等需要同时组织主次按钮的场景。',
    '删除、下线、重置等风险动作，需要通过 danger 语义明确提示后果。',
    '处理中、锁定中、权限不足等需要展示 loading 或 disabled 状态的场景。',
  ],
  examples: [
    {
      id: 'button-variants',
      title: '基础变体',
      summary:
        '用一组常见按钮变体验证主按钮、次按钮、幽灵按钮与文本按钮的基本层级关系。',
      relatedProps: ['variant', 'children'],
      preview: <ButtonVariantPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonVariantPreview() {
  return (
    <>
      <Button variant="primary">立即创建</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">更多操作</Button>
      <Button variant="text">稍后处理</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者快速建立 `variant` 与业务动作优先级之间的映射关系。',
        highlights: [
          '`primary` 适合页面主操作。',
          '`secondary` 适合与主操作并列的次要动作。',
          '`ghost` 与 `text` 适合弱化存在感的轻操作。',
        ],
        boundaries: [
          '当页面只允许一个主操作时，优先只保留一个 `primary`。',
          '如果操作本质是导航链接，不应仅为了视觉统一而滥用按钮。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonVariantPreview',
        supportedControls: ['variant'],
      },
    },
    {
      id: 'button-danger',
      title: '风险操作',
      summary:
        '展示风险动作与取消动作并排出现时的层级关系，避免危险操作和主流程混淆。',
      relatedProps: ['variant', 'disabled'],
      preview: <ButtonDangerPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonDangerPreview() {
  return (
    <>
      <Button variant="danger">删除资源</Button>
      <Button variant="danger" disabled>
        已禁用删除
      </Button>
      <Button variant="secondary">取消</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助在文档中明确 `danger` 语义只用于真正具有破坏性的操作。',
        highlights: [
          '通过 `variant="danger"` 直接表达风险动作。',
          '禁用态仍保留危险语义，便于说明权限或前置条件未满足。',
        ],
        boundaries: [
          '不要把普通的“清空筛选”或“返回”动作标成 `danger`。',
          '风险动作仍应结合业务确认机制，而不是只依赖颜色警示。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonDangerPreview',
        supportedControls: ['variant', 'disabled'],
      },
    },
    {
      id: 'button-size',
      title: '尺寸层级',
      summary:
        '对比 sm / md / lg 三档尺寸，帮助在紧凑工具条和主流程页脚中快速选型。',
      relatedProps: ['size', 'variant'],
      preview: <ButtonSizePreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonSizePreview() {
  return (
    <>
      <Button variant="primary" size="sm">
        小按钮
      </Button>
      <Button variant="primary" size="md">
        默认按钮
      </Button>
      <Button variant="primary" size="lg">
        大按钮
      </Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '说明按钮尺寸主要服务于信息密度，而不是用于表达主次优先级。',
        highlights: [
          '`sm` 更适合列表工具条和局部操作。',
          '`md` 是最稳妥的默认尺寸。',
          '`lg` 适合着陆页或主流程收口区。',
        ],
        boundaries: [
          '不要用尺寸代替视觉层级，优先级仍应通过 `variant` 表达。',
          '同一操作组内尽量保持统一尺寸，避免视觉跳动。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonSizePreview',
        supportedControls: ['size'],
      },
    },
    {
      id: 'button-states',
      title: '加载与禁用状态',
      summary: '展示按钮在提交中和不可操作时的反馈方式，避免用户重复触发动作。',
      relatedProps: ['loading', 'disabled'],
      preview: <ButtonLoadingPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonLoadingPreview() {
  return (
    <>
      <Button variant="primary" loading>
        提交中
      </Button>
      <Button variant="secondary" disabled>
        已锁定
      </Button>
      <Button variant="ghost">返回列表</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明 `loading` 与 `disabled` 的职责不同：一个表达处理中，一个表达当前不可操作。',
        highlights: [
          '`loading` 会同步禁用按钮，避免重复提交。',
          '`disabled` 更适合权限不足或前置条件未满足。',
        ],
        boundaries: [
          '若操作已经开始执行，优先使用 `loading` 而不是只设成 `disabled`。',
          '状态反馈需要和页面其他提示保持一致，避免只剩按钮自己变化。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonLoadingPreview',
        supportedControls: ['loading', 'disabled'],
      },
    },
    {
      id: 'button-toolbar',
      title: '工具栏组合场景',
      summary:
        '在同一个工具栏中组合主操作、辅助操作与风险操作，验证文档骨架是否能承载更接近官网的场景化示例。',
      relatedProps: ['variant', 'size'],
      preview: <ButtonToolbarPreview />,
      code: `import { Button } from '@sci-comp/core'

export function ButtonToolbarPreview() {
  return (
    <>
      <Button variant="primary">发布版本</Button>
      <Button variant="secondary">保存草稿</Button>
      <Button variant="ghost">导出记录</Button>
      <Button variant="danger">删除版本</Button>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者理解在真实业务组合里，按钮层级如何稳定地排布。',
        highlights: [
          '主操作与次操作应稳定地并列出现。',
          '辅助操作可以弱化，但不应抢占主流程视觉焦点。',
          '风险操作需要与主流程操作拉开语义距离。',
        ],
        boundaries: [
          '若页面动作超过 4 个，应考虑拆分操作区而不是继续堆按钮。',
          '风险操作不应默认和主操作紧挨在一起。',
        ],
      },
      editorReservation: {
        initialCode: 'ButtonToolbarPreview',
        supportedControls: ['variant', 'size'],
      },
    },
  ],
  api: [
    {
      name: 'variant',
      description:
        '按钮语义层级映射，统一主按钮、次按钮、风险按钮与弱化操作的表达。',
      type: "'primary' | 'secondary' | 'danger' | 'ghost' | 'text'",
      defaultValue: "'primary'",
      notes: '内部会映射到 antd Button 的 type / danger / ghost 组合。',
    },
    {
      name: 'size',
      description: '按钮尺寸语义映射，用于在不同信息密度场景下保持尺寸一致。',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      notes: '分别映射到 antd 的 small / middle / large。',
    },
    {
      name: 'loading',
      description: '展示按钮进行中状态，并在加载期间避免重复触发。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '高频提交场景建议优先使用。',
    },
    {
      name: 'disabled',
      description: '禁用按钮交互，适合权限不足或前置条件未满足的场景。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '来自 antd 透传，但在业务中使用频率很高，建议纳入主表。',
    },
    {
      name: 'type',
      description:
        '按钮原生 `htmlType`，用于 submit / reset / button 等表单行为控制。',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      notes: '组件层命名为 `type`，内部映射到 antd Button 的 `htmlType`。',
    },
    {
      name: 'onClick',
      description: '点击事件处理函数。',
      type: '(event) => void',
      defaultValue: '-',
      notes: '保留 antd 原生交互方式。',
    },
    {
      name: 'icon',
      description: '按钮前置图标，适合强调动作含义或提升扫描效率。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '内部会补充装饰性图标的 aria-hidden 处理。',
    },
  ],
  wrapperNotes: [
    'Button 仍然基于 antd Button 实现，不是脱离 antd 的自定义按钮体系。',
    '第一版 API 表只覆盖业务里高频使用的属性，不等同于 antd Button 的全量参数镜像。',
    '更细粒度的布局、危险确认、权限控制等仍应由业务层或更高阶组件承载，而不是继续堆在基础 Button wrapper 中。',
  ],
}

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
