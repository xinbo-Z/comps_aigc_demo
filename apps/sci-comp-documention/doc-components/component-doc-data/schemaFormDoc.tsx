import type { ComponentDocPageData } from '../ComponentDoc'
import {
  SchemaFormBasicPreview,
  SchemaFormDynamicPreview,
  SchemaFormListPreview,
  SchemaFormSchemaOnlyPreview,
} from '../component-doc-previews/schemaFormPreviews'

export const schemaFormDocPage: ComponentDocPageData = {
  title: 'SchemaForm',
  description:
    '`SchemaForm` 是构建在基础 `Form` 之上的高阶表单组件，用于承载 schema 驱动字段渲染、动态显示规则与列表项编排等配置驱动能力。',
  definition: [
    '基于 antd Form 与统一 schema 类型模型构建，高频场景通过配置描述字段结构，而不是手写大量 `Form.Item`。',
    '支持 `visibleWhen`、`itemPropsWhen` 等动态规则能力，用于表达字段显示、必填与提示文案随上下文变化的场景。',
    '支持 `list` 类型字段、`fields` / `itemSchema`、`minItems` / `maxItems` 等能力，适合承载重复配置项编排。',
  ],
  scenarios: [
    '字段结构由配置描述，且希望减少重复手写 `Form.Item` 的场景。',
    '需要根据当前表单值动态控制字段显示、必填、说明或状态的场景。',
    '需要维护可增删的重复字段组、规则列表或步骤列表的场景。',
    '希望同时保留 antd Form 提交流程与更高阶 schema 驱动能力的场景。',
  ],
  examples: [
    {
      id: 'schema-form-basic',
      title: '基础 schema 驱动表单',
      summary:
        '通过一组基础字段说明 SchemaForm 的主入口是“用 schema 描述字段结构”，同时保留提交流程与初始值能力。',
      relatedProps: ['schema', 'initialValues', 'children'],
      preview: <SchemaFormBasicPreview />,
      code: `import { Button, SchemaForm, type FormSchemaField } from '@sci-comp/core'

const basicSchema: FormSchemaField[] = [
  {
    key: 'name',
    name: 'name',
    type: 'input',
    label: '组件名称',
    required: true,
    inputProps: {
      placeholder: '请输入组件名称',
    },
  },
  {
    key: 'code',
    name: 'code',
    type: 'input',
    label: '组件编码',
    required: true,
    inputProps: {
      placeholder: '请输入组件编码',
    },
  },
  {
    key: 'type',
    name: 'type',
    type: 'select',
    label: '组件类型',
    options: [
      { label: '基础组件', value: 'basic' },
      { label: '业务组件', value: 'business' },
    ],
    selectProps: {
      placeholder: '请选择组件类型',
      allowClear: true,
    },
  },
]

export function SchemaFormBasicPreview() {
  return (
    <SchemaForm
      schema={basicSchema}
      initialValues={{ type: 'basic' }}
      style={{ maxWidth: '480px' }}
    >
      <Button type="submit">提交配置</Button>
    </SchemaForm>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者确认 SchemaForm 的主路径是以 schema 描述字段，而不是继续逐个手写 Form.Item。',
        highlights: [
          '`schema` 负责描述字段结构，`initialValues` 和提交流程仍沿用 Form 心智。',
          'children 可继续承载提交按钮或额外操作区，便于与现有表单页结构衔接。',
        ],
        boundaries: [
          '如果字段结构固定且页面逻辑简单，优先使用基础 Form 会更直接。',
          'SchemaForm 不是为了替代所有组合式表单，而是为了减少配置驱动场景下的重复样板代码。',
        ],
      },
      editorReservation: {
        initialCode: 'SchemaFormBasicPreview',
        supportedControls: ['schema', 'initialValues', 'children'],
      },
    },
    {
      id: 'schema-form-dynamic',
      title: '动态显示与动态规则',
      summary:
        '通过发布方式切换展示 `visibleWhen` 与 `itemPropsWhen` 的组合，说明 SchemaForm 如何承载字段级动态逻辑。',
      relatedProps: ['visibleWhen', 'itemPropsWhen', 'rules'],
      preview: <SchemaFormDynamicPreview />,
      code: `import { Button, SchemaForm, type FormSchemaField } from '@sci-comp/core'

const dynamicSchema: FormSchemaField[] = [
  {
    key: 'deployType',
    name: 'deployType',
    type: 'select',
    label: '发布方式',
    options: [
      { label: '立即发布', value: 'immediate' },
      { label: '定时发布', value: 'scheduled' },
    ],
    selectProps: {
      placeholder: '请选择发布方式',
    },
  },
  {
    key: 'publishAt',
    name: 'publishAt',
    type: 'input',
    label: '发布时间',
    visibleWhen: ({ getValue }) => getValue('deployType') === 'scheduled',
    itemPropsWhen: ({ getValue }) => ({
      required: getValue('deployType') === 'scheduled',
      extra:
        getValue('deployType') === 'scheduled'
          ? '定时发布时需要补充时间说明'
          : '仅在定时发布时显示',
    }),
    inputProps: {
      placeholder: '例如：2026-05-01 10:00',
    },
  },
]

export function SchemaFormDynamicPreview() {
  return (
    <SchemaForm
      schema={dynamicSchema}
      initialValues={{ deployType: 'scheduled' }}
      style={{ maxWidth: '480px' }}
    >
      <Button type="submit">保存发布策略</Button>
    </SchemaForm>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者理解 SchemaForm 最有价值的部分之一是字段展示与规则可随上下文变化。',
        highlights: [
          '`visibleWhen` 负责决定字段是否显示。',
          '`itemPropsWhen` 适合动态生成 required、extra、help 等字段级属性。',
        ],
        boundaries: [
          '动态规则应聚焦字段级条件逻辑，不要把复杂业务流程状态机全部塞进 schema。',
          '如果规则已经演变为跨页面编排或流程引擎，应考虑更独立的业务层抽象。',
        ],
      },
      editorReservation: {
        initialCode: 'SchemaFormDynamicPreview',
        supportedControls: ['visibleWhen', 'itemPropsWhen', 'rules'],
      },
    },
    {
      id: 'schema-form-list',
      title: '列表项编排',
      summary:
        '展示 `list` 字段与子字段配置，适合说明 SchemaForm 如何组织重复配置项与增删逻辑。',
      relatedProps: ['type', 'fields', 'minItems', 'maxItems'],
      preview: <SchemaFormListPreview />,
      code: `import { Button, SchemaForm, type FormSchemaField } from '@sci-comp/core'

const listSchema: FormSchemaField[] = [
  {
    key: 'fields',
    name: 'fields',
    type: 'list',
    label: '字段列表',
    itemLabel: '字段配置',
    addButtonText: '新增字段',
    removeButtonText: '删除字段',
    minItems: 1,
    maxItems: 3,
    initialValue: [{ label: '名称', component: 'input' }],
    fields: [
      {
        key: 'label',
        name: 'label',
        type: 'input',
        label: '字段标签',
        required: true,
        inputProps: {
          placeholder: '请输入字段标签',
        },
      },
      {
        key: 'component',
        name: 'component',
        type: 'select',
        label: '字段类型',
        options: [
          { label: '输入框', value: 'input' },
          { label: '下拉框', value: 'select' },
          { label: '数字框', value: 'number' },
        ],
        selectProps: {
          placeholder: '请选择字段类型',
        },
      },
    ],
  },
]

export function SchemaFormListPreview() {
  return (
    <SchemaForm schema={listSchema} style={{ maxWidth: '560px' }}>
      <Button type="submit">保存字段配置</Button>
    </SchemaForm>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者建立“重复配置项 = list 字段”的心智模型。',
        highlights: [
          '`list` 适合承载可增删的重复项配置。',
          '`fields` 或 `itemSchema` 用于描述单个列表项内部的字段结构。',
        ],
        boundaries: [
          '列表能力适合中等复杂度的配置编排，不等于完整低代码设计器。',
          '当列表项之间存在复杂联动或深层嵌套时，应警惕页面可维护性快速下降。',
        ],
      },
      editorReservation: {
        initialCode: 'SchemaFormListPreview',
        supportedControls: ['type', 'fields', 'minItems', 'maxItems'],
      },
    },
    {
      id: 'schema-form-schema-only',
      title: 'schemaOnly 与纯配置渲染',
      summary:
        '展示 `schemaOnly` 的场景，帮助说明当字段和结构都由 schema 决定时，可以不额外混入 children。',
      relatedProps: ['schemaOnly', 'schema', 'initialValues'],
      preview: <SchemaFormSchemaOnlyPreview />,
      code: `import { SchemaForm, type FormSchemaField } from '@sci-comp/core'

const schemaOnlySchema: FormSchemaField[] = [
  {
    key: 'owner',
    name: 'owner',
    type: 'input',
    label: '负责人',
    inputProps: {
      placeholder: '请输入负责人',
    },
  },
  {
    key: 'priority',
    name: 'priority',
    type: 'select',
    label: '优先级',
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
    selectProps: {
      placeholder: '请选择优先级',
    },
  },
]

export function SchemaFormSchemaOnlyPreview() {
  return (
    <SchemaForm
      schema={schemaOnlySchema}
      schemaOnly
      initialValues={{ owner: '组件组', priority: 'medium' }}
      style={{ maxWidth: '420px' }}
    />
  )
}`,
      sourceDetails: {
        purpose: '帮助读者理解 SchemaForm 既能与 children 组合，也能完全由 schema 驱动渲染。',
        highlights: [
          '`schemaOnly` 适合字段结构与操作区都希望通过上层统一控制的场景。',
          '页面仍可结合 `initialValues` 提供编辑态默认值。',
        ],
        boundaries: [
          'schemaOnly 不意味着页面一定更简单，只是将表单内容更彻底地收敛为配置驱动。',
          '如果页面需要复杂自定义布局区块，仍可回到 children 组合模式。',
        ],
      },
      editorReservation: {
        initialCode: 'SchemaFormSchemaOnlyPreview',
        supportedControls: ['schemaOnly', 'schema', 'initialValues'],
      },
    },
  ],
  api: [
    {
      name: 'schema',
      description: '描述字段结构的核心配置入口，支持数组或包含 fields 的定义对象。',
      type: 'readonly FormSchemaField[] | FormSchemaDefinition',
      defaultValue: '-',
      notes: 'SchemaForm 的主入口能力。',
    },
    {
      name: 'schemaOnly',
      description: '控制是否只渲染 schema 生成的字段，而不渲染 children。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '适合纯配置驱动渲染场景。',
    },
    {
      name: 'children',
      description: '补充提交按钮、自定义说明区或额外操作内容。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '与 schema 生成字段一起组成完整页面结构。',
    },
    {
      name: 'layout',
      description: '控制表单布局方向，沿用基础 Form 的布局能力。',
      type: "'horizontal' | 'vertical' | 'inline'",
      defaultValue: "'vertical'",
      notes: '来自底层 Form 透传。',
    },
    {
      name: 'initialValues',
      description: '设置表单初始值，适合编辑态回填与默认选择。',
      type: 'Record<string, unknown>',
      defaultValue: '-',
      notes: '与 schema 配合组织编辑态默认值。',
    },
    {
      name: 'onFinish',
      description: '表单校验通过后的提交回调。',
      type: '(values) => void',
      defaultValue: '-',
      notes: '仍沿用 Form 的提交流程心智。',
    },
    {
      name: 'visibleWhen',
      description: '根据当前表单上下文决定字段是否显示。',
      type: '(context) => boolean',
      defaultValue: '-',
      notes: '高频用于字段级动态显示逻辑。',
    },
    {
      name: 'itemPropsWhen',
      description: '根据上下文动态生成字段级 Form.Item 属性。',
      type: '(context) => Partial<FormItemProps>',
      defaultValue: '-',
      notes: '常用于动态 required、help、extra 等能力。',
    },
    {
      name: 'fields / itemSchema',
      description: '描述 list 字段中单个列表项的字段结构。',
      type: 'readonly FormSchemaField[]',
      defaultValue: '-',
      notes: '用于重复项配置编排。',
    },
    {
      name: 'minItems / maxItems',
      description: '限制 list 字段的最小与最大项数。',
      type: 'number',
      defaultValue: '-',
      notes: '适合表达列表项约束。',
    },
  ],
  selectionTips: [
    '字段结构固定、只需要静态布局与基础校验时，优先使用基础 Form。',
    '当字段需要由配置描述、规则驱动显示或支持重复项编排时，再切换到 SchemaForm。',
    '如果需求已经演变为完整业务 DSL、低代码设计器或复杂流程引擎，应谨慎评估是否继续堆积在当前 SchemaForm 上。',
  ],
  wrapperNotes: [
    'SchemaForm 是独立于基础 Form 的高阶能力组件，重点是配置驱动字段定义与动态规则表达。',
    'API 主表优先覆盖高频 schema 语义，不等同于完整类型定义或所有组合方式的全量手册。',
    '复杂 DSL 设计器、任意规则引擎与大规模业务流程编排不属于当前页面第一版主路径能力。',
  ],
}
