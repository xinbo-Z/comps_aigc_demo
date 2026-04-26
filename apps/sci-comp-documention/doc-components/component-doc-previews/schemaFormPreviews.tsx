import { Button, SchemaForm, createThemeTokens, type FormSchemaField } from '@sci-comp/core'

const tokens = createThemeTokens()

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
} as const

const panelStyle = {
  padding: '16px',
  borderRadius: '14px',
  border: `1px solid ${tokens.colorPrimary}1F`,
  background: `${tokens.colorPrimary}08`,
  color: tokens.colorText,
  fontSize: '13px',
  lineHeight: 1.8,
} as const

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
  {
    key: 'remark',
    name: 'remark',
    type: 'textarea',
    label: '发布说明',
    itemPropsWhen: ({ getValue }) => ({
      required: getValue('deployType') === 'scheduled',
      extra:
        getValue('deployType') === 'scheduled'
          ? '定时发布建议补充发布窗口说明'
          : '立即发布时可选填写',
    }),
    textareaProps: {
      placeholder: '请输入发布说明',
      rows: 3,
    },
  },
]

const listSchema: FormSchemaField[] = [
  {
    key: 'name',
    name: 'name',
    type: 'input',
    label: '表单名称',
    required: true,
    inputProps: {
      placeholder: '例如：发布配置表单',
    },
  },
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
}

export function SchemaFormDynamicPreview() {
  return (
    <div style={stackStyle}>
      <SchemaForm
        schema={dynamicSchema}
        initialValues={{ deployType: 'scheduled' }}
        style={{ maxWidth: '480px' }}
      >
        <Button type="submit">保存发布策略</Button>
      </SchemaForm>
      <div style={panelStyle}>
        切换“发布方式”后可以看到 `visibleWhen` 与 `itemPropsWhen` 对字段展示和必填规则的影响。
      </div>
    </div>
  )
}

export function SchemaFormListPreview() {
  return (
    <div style={stackStyle}>
      <SchemaForm schema={listSchema} style={{ maxWidth: '560px' }}>
        <Button type="submit">保存字段配置</Button>
      </SchemaForm>
      <div style={panelStyle}>
        列表字段适合承载可增删的重复配置项，常用于字段编排、步骤配置或规则列表维护。
      </div>
    </div>
  )
}

export function SchemaFormSchemaOnlyPreview() {
  return (
    <div style={stackStyle}>
      <SchemaForm
        schema={schemaOnlySchema}
        schemaOnly
        initialValues={{ owner: '组件组', priority: 'medium' }}
        style={{ maxWidth: '420px' }}
      />
      <div style={panelStyle}>
        `schemaOnly` 适合只由配置描述字段结构的场景；如果仍需额外插入自定义操作区，可继续通过 children 组合补充。
      </div>
    </div>
  )
}
