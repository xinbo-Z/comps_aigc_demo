import type { ComponentDocPageData } from '../ComponentDoc'
import {
  InputBasicPreview,
  InputLabeledPreview,
  InputReadonlyPreview,
  InputValidationPreview,
} from '../component-doc-previews/inputPreviews'

export const inputDocPage: ComponentDocPageData = {
  title: 'Input',
  description:
    '`Input` 是基于 Ant Design Input 的通用封装组件，在透传原生输入能力的同时，补充了 `label`、`helperText` 与 `invalid` 这类轻量展示和可访问性增强。',
  definition: [
    '基于 antd Input 做轻量 wrapper，保留常用输入交互与原生透传能力。',
    '通过 `label` 与 `helperText` 收敛常见字段说明写法，并补齐关联的可访问性语义。',
    '通过 `invalid` 在不改写整体心智模型的前提下，统一错误态展示与辅助提示样式。',
  ],
  scenarios: [
    '表单、筛选区和弹窗内的基础文本输入场景。',
    '需要在输入框附近同时呈现字段标签与辅助说明的场景。',
    '需要快速表达错误态、校验失败或不可编辑状态的场景。',
    '仍希望继续使用 antd 原生 placeholder、disabled、readOnly 等输入能力的场景。',
  ],
  examples: [
    {
      id: 'input-basic',
      title: '基础输入',
      summary:
        '展示最轻量的输入框写法，帮助用户快速确认 wrapper 与 antd 原生输入心智保持一致。',
      relatedProps: ['placeholder'],
      preview: <InputBasicPreview />,
      code: `import { Input } from '@sci-comp/core'

export function InputBasicPreview() {
  return (
    <>
      <Input placeholder="请输入组件名称" />
      <Input placeholder="请输入资源编码" />
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者确认 Input 在最小使用场景下依然保持原生输入体验。',
        highlights: [
          '不传 `label`、`helperText` 时可直接作为普通输入框使用。',
          'placeholder 等 antd 原生高频属性可继续直接透传。',
        ],
        boundaries: [
          '如果页面只需要极简输入能力，不必额外为了文档示例强行补标签。',
          '更复杂的输入格式约束仍应优先使用 antd 原生能力或业务层校验。',
        ],
      },
      editorReservation: {
        initialCode: 'InputBasicPreview',
        supportedControls: ['placeholder'],
      },
    },
    {
      id: 'input-labeled',
      title: '标签与辅助说明',
      summary:
        '展示 `label` 与 `helperText` 的组合方式，适合表单字段或设置面板中的常见输入项。',
      relatedProps: ['label', 'helperText', 'placeholder'],
      preview: <InputLabeledPreview />,
      code: `import { Input } from '@sci-comp/core'

export function InputLabeledPreview() {
  return (
    <>
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
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明 wrapper 如何把字段标签、提示说明与输入框本体收敛为一组稳定写法。',
        highlights: [
          '`label` 会与输入框建立关联，提升表单可读性。',
          '`helperText` 适合承载简短说明、限制条件或补充提示。',
        ],
        boundaries: [
          '较长的字段解释不应全部堆在 `helperText` 中，必要时应拆到外层说明区域。',
          '字段编排与布局规则仍应由 Form 或业务容器负责。',
        ],
      },
      editorReservation: {
        initialCode: 'InputLabeledPreview',
        supportedControls: ['label', 'helperText', 'placeholder'],
      },
    },
    {
      id: 'input-validation',
      title: '错误态与校验反馈',
      summary:
        '通过 `invalid` 展示错误态输入与提示文案，帮助统一基础校验反馈的表达。',
      relatedProps: ['invalid', 'helperText', 'label'],
      preview: <InputValidationPreview />,
      code: `import { Input } from '@sci-comp/core'

export function InputValidationPreview() {
  return (
    <>
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
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明 `invalid` 不只是视觉红框，还会同步影响辅助文本与无障碍语义。',
        highlights: [
          '`invalid` 会映射到输入错误态并补充 `aria-invalid`。',
          '错误提示可直接复用 `helperText`，减少额外拼装。',
        ],
        boundaries: [
          '复杂校验流程与字段联动规则仍应由 Form 或业务逻辑控制。',
          '当错误来源较复杂时，应配合外层提示而不只依赖单个字段红框。',
        ],
      },
      editorReservation: {
        initialCode: 'InputValidationPreview',
        supportedControls: ['invalid', 'helperText', 'label'],
      },
    },
    {
      id: 'input-readonly',
      title: '禁用态与只读态',
      summary:
        '对比 disabled 与 readOnly 的常见用法，帮助区分“不可编辑”和“仅可查看”两类状态。',
      relatedProps: ['disabled', 'readOnly', 'value'],
      preview: <InputReadonlyPreview />,
      code: `import { Input } from '@sci-comp/core'

export function InputReadonlyPreview() {
  return (
    <>
      <Input
        label="当前负责人"
        helperText="当前阶段暂不允许修改"
        value="张三"
        disabled
      />
      <Input
        label="发布版本"
        helperText="版本号由系统生成，仅支持查看"
        value="v2.3.0"
        readOnly
      />
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '帮助读者在表单只读区、详情面板和条件受限场景下选择合适的输入状态。',
        highlights: [
          '`disabled` 更适合当前不可交互、也不希望用户聚焦尝试编辑的字段。',
          '`readOnly` 更适合允许聚焦查看、复制内容但不允许修改的字段。',
          '`invalid` 应用于当前值需要纠正或校验失败的场景，而不是替代禁用或只读语义。',
        ],
        boundaries: [
          '如果字段只是临时不可改，不应一律替换为纯文本展示。',
          '状态选择应与页面整体编辑模型一致，避免同页出现混乱的输入反馈。',
        ],
      },
      editorReservation: {
        initialCode: 'InputReadonlyPreview',
        supportedControls: ['disabled', 'readOnly', 'value'],
      },
    },
  ],
  api: [
    {
      name: 'label',
      description: '输入项标签，适合与输入框形成一组稳定的字段表达。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '由 wrapper 负责与输入框建立关联。',
    },
    {
      name: 'helperText',
      description: '输入项辅助说明或错误提示文案。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '高频用于字段说明、限制提示与轻量错误反馈。',
    },
    {
      name: 'invalid',
      description: '标记当前输入为错误态，并同步无障碍语义。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '会映射到 antd 的错误状态与 `aria-invalid`。',
    },
    {
      name: 'placeholder',
      description: '输入占位提示，用于在空值状态下提供轻量引导。',
      type: 'string',
      defaultValue: '-',
      notes: '来自 antd 原生透传。',
    },
    {
      name: 'disabled',
      description: '禁用输入交互，适合权限不足或当前阶段不可编辑的场景。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '来自 antd 原生透传。',
    },
    {
      name: 'readOnly',
      description: '保留字段展示与聚焦能力，但不允许用户修改值。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '来自 antd 原生透传，常用于详情确认类场景。',
    },
    {
      name: 'status',
      description: '底层 antd 输入状态能力。',
      type: "'error' | 'warning'",
      defaultValue: '-',
      notes: '该 wrapper 不直接暴露 `status`，错误态优先通过 `invalid` 表达。',
    },
  ],
  selectionTips: [
    '需要统一字段标签、说明与错误提示时，优先使用当前 Input wrapper。',
    '如果只是最基础的文本输入，仍可把它当作轻量 antd Input 使用。',
    '`invalid` 用于表达当前值需要修正，`disabled` 用于当前不可操作，`readOnly` 用于允许查看但不允许编辑。',
    '更复杂的字段编排、校验联动与提交流程应交给 Form 或更高阶容器处理，而不是继续把流程能力堆进单个 Input。',
  ],
  wrapperNotes: [
    'Input 仍然基于 antd Input 封装，不引入独立的输入 DSL 或复杂规则系统。',
    'API 主表只覆盖帮助理解 wrapper 的高频能力，不等同于 antd Input 的全量参数镜像。',
    '`label`、`helperText` 与 `invalid` 负责字段级展示和轻量错误表达；整体验证时机、字段布局与提交流程继续由 Form 或业务容器负责。',
  ],
}
