import type { ComponentDocPageData } from '../ComponentDoc'
import {
  FormBasicPreview,
  FormInitialValuesPreview,
  FormLayoutPreview,
  FormValidationPreview,
} from '../component-doc-previews/formPreviews'

export const formDocPage: ComponentDocPageData = {
  title: 'Form',
  description:
    '`Form` 是基于 Ant Design Form 的通用封装组件，保留组合式表单心智，并通过统一默认值收敛基础布局与提交流程的常见写法。',
  definition: [
    '基于 antd Form 做轻量封装，继续沿用 `Form.Item + children` 的组合式使用方式。',
    '默认使用 `layout="vertical"`、`colon={false}` 与 `requiredMark={false}`，帮助统一项目内基础表单的默认风格。',
    '适合静态字段布局、基础校验、默认值与提交流程，不默认承载 schema 驱动字段生成或复杂动态编排；这类能力应进入独立的 SchemaForm 页面。',
  ],
  scenarios: [
    '基础录入、设置页和弹窗内的组合式表单场景。',
    '需要在纵向与横向布局之间切换的常见页面场景。',
    '需要使用必填校验、默认值和提交流程的基础业务场景。',
    '仍希望继续使用 antd Form 原生规则与 Form.Item 组合方式的场景。',
  ],
  examples: [
    {
      id: 'form-basic',
      title: '基础表单',
      summary:
        '展示最常见的 Form.Item 组合写法，帮助快速理解基础 Form 的主路径仍然是组合式表单。',
      relatedProps: ['children', 'onFinish'],
      preview: <FormBasicPreview />,
      code: `import { Button, Form, Input } from '@sci-comp/core'

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
}`,
      sourceDetails: {
        purpose:
          '帮助读者确认基础 Form 的第一入口依然是 antd 风格的组合式写法。',
        highlights: [
          '`Form.Item` 仍然是组织字段的核心方式。',
          '基础 Form 适合静态字段结构明确的场景。',
        ],
        boundaries: [
          '如果字段结构需要配置驱动生成，不应继续停留在基础 Form 页面。',
          '复杂动态编排能力应交给独立的 SchemaForm 承载。',
        ],
      },
      editorReservation: {
        initialCode: 'FormBasicPreview',
        supportedControls: ['children', 'onFinish'],
      },
    },
    {
      id: 'form-layout',
      title: '布局差异',
      summary:
        '展示 vertical 与 horizontal 两种高频布局，帮助说明基础 Form 在常见页面中的布局切换方式。',
      relatedProps: ['layout', 'labelCol', 'wrapperCol'],
      preview: <FormLayoutPreview />,
      code: `import { Form, Input } from '@sci-comp/core'

export function FormLayoutPreview() {
  return (
    <>
      <Form layout="vertical" style={{ maxWidth: '420px' }}>
        <Form.Item label="组件名称" name="vertical-name">
          <Input placeholder="纵向布局示例" />
        </Form.Item>
        <Form.Item label="负责人" name="vertical-owner">
          <Input placeholder="请输入负责人" />
        </Form.Item>
      </Form>
      <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="组件名称" name="horizontal-name">
          <Input placeholder="横向布局示例" />
        </Form.Item>
        <Form.Item label="负责人" name="horizontal-owner">
          <Input placeholder="请输入负责人" />
        </Form.Item>
      </Form>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助读者在最常见的两类页面布局之间做稳定切换。',
        highlights: [
          '默认 vertical 更适合大部分配置表单与弹窗表单。',
          'horizontal 适合字段较短、需要压缩纵向空间的场景。',
        ],
        boundaries: [
          '布局切换不等于字段动态编排。',
          '更复杂的布局规则仍应由页面结构和业务容器控制。',
        ],
      },
      editorReservation: {
        initialCode: 'FormLayoutPreview',
        supportedControls: ['layout', 'labelCol', 'wrapperCol'],
      },
    },
    {
      id: 'form-validation',
      title: '必填与校验反馈',
      summary:
        '展示基础 required 规则与提交校验，帮助说明 Form 对规则校验的主路径支持。',
      relatedProps: ['rules', 'onFinishFailed'],
      preview: <FormValidationPreview />,
      code: `import { Button, Form, Input } from '@sci-comp/core'

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
}`,
      sourceDetails: {
        purpose: '说明基础 Form 已足以承载高频的必填校验与提交反馈。',
        highlights: [
          '`rules` 继续沿用 antd 原生规则声明方式。',
          '表单提交失败后的反馈链路无需额外 DSL 即可组织。',
        ],
        boundaries: [
          '跨字段动态规则与复杂条件展示不应默认进入基础 Form 页面。',
          '更复杂的字段显示逻辑应交给 SchemaForm 或业务层。',
        ],
      },
      editorReservation: {
        initialCode: 'FormValidationPreview',
        supportedControls: ['rules', 'onFinishFailed'],
      },
    },
    {
      id: 'form-initial-values',
      title: '默认值与提交流程',
      summary:
        '展示 initialValues 的常见写法，帮助说明基础 Form 如何组织编辑态回填与提交流程。',
      relatedProps: ['initialValues', 'onFinish'],
      preview: <FormInitialValuesPreview />,
      code: `import { Button, Form, Input } from '@sci-comp/core'

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
}`,
      sourceDetails: {
        purpose: '帮助读者理解基础编辑表单如何通过初始值快速回填已有数据。',
        highlights: [
          '`initialValues` 适合承载静态编辑态默认值。',
          '基础提交流程仍然围绕 `onFinish` 等原生入口展开。',
        ],
        boundaries: [
          '如果初始值依赖复杂 schema 计算或动态字段树，不应继续留在基础 Form 范围内。',
          '大规模字段编排和配置驱动生成应交给 SchemaForm。',
        ],
      },
      editorReservation: {
        initialCode: 'FormInitialValuesPreview',
        supportedControls: ['initialValues', 'onFinish'],
      },
    },
  ],
  api: [
    {
      name: 'layout',
      description: '控制表单布局方向。',
      type: "'horizontal' | 'vertical' | 'inline'",
      defaultValue: "'vertical'",
      notes: '当前 wrapper 默认使用 vertical。',
    },
    {
      name: 'colon',
      description: '控制标签后是否展示冒号。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '当前 wrapper 默认关闭。',
    },
    {
      name: 'requiredMark',
      description: '控制必填标记的展示方式。',
      type: 'boolean | "optional"',
      defaultValue: 'false',
      notes: '当前 wrapper 默认关闭。',
    },
    {
      name: 'initialValues',
      description: '设置表单初始值。',
      type: 'Record<string, unknown>',
      defaultValue: '-',
      notes: '常用于编辑态回填。',
    },
    {
      name: 'onFinish',
      description: '表单校验通过后的提交回调。',
      type: '(values) => void',
      defaultValue: '-',
      notes: '基础提交流程的主入口。',
    },
    {
      name: 'onFinishFailed',
      description: '表单校验失败后的回调。',
      type: '(errorInfo) => void',
      defaultValue: '-',
      notes: '适合承接失败提示、滚动定位等逻辑。',
    },
    {
      name: 'disabled',
      description: '统一禁用整张表单内的交互。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '来自 antd 原生透传。',
    },
  ],
  selectionTips: [
    '静态字段结构、基础校验和常规提交流程优先使用基础 Form。',
    '如果需求开始依赖 schema/config 生成字段、动态字段编排或复杂 DSL，请切换到独立的 SchemaForm 能力。',
    '基础 Form 页面不承担 SchemaForm 教程或高阶编排能力总览职责。',
  ],
  wrapperNotes: [
    'Form 仍然基于 antd Form 实现，重点是统一默认布局与保留组合式使用心智。',
    'API 主表只覆盖帮助理解基础 wrapper 的高频字段，不等同于 antd Form 的全量参数文档。',
    'schema 驱动字段生成、动态显示规则、列表编排和复杂 DSL 能力不属于当前基础 Form 页范围。',
  ],
}
