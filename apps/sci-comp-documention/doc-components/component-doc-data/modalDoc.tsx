import type { ComponentDocPageData } from '../ComponentDoc'
import {
  ModalBasicPreview,
  ModalFormPreview,
  ModalFullscreenPreview,
  ModalLoadingPreview,
} from '../component-doc-previews/modalPreviews'

export const modalDocPage: ComponentDocPageData = {
  title: 'Modal',
  description:
    '`Modal` 是基于 Ant Design Modal 的通用封装组件，保留原生弹窗能力，并补充了 `fullscreen` 这一同一心智下的尺寸与布局语义扩展。',
  definition: [
    '基于 antd Modal 做直接封装，保留 open、title、footer、回调等高频弹窗能力。',
    '通过 `fullscreen` 提供更适合大体量内容承载的语义扩展，但仍属于同一 Modal 交互模型。',
    '适合确认、编辑、预览与局部流程收口，不默认承载复杂工作台式全屏系统。',
  ],
  scenarios: [
    '发布确认、删除确认等需要短流程中断和明确结果回收的场景。',
    '在弹窗内承载表单、配置项或局部编辑内容的场景。',
    '需要放大内容承载空间但仍沿用 Modal 开关与遮罩模型的全屏预览场景。',
    '需要展示提交中或确认中状态反馈的受控弹窗场景。',
  ],
  examples: [
    {
      id: 'modal-basic',
      title: '基础确认弹窗',
      summary:
        '展示最常见的受控确认弹窗写法，帮助快速理解 open、title 和关闭回调的主路径用法。',
      relatedProps: ['open', 'title', 'onOk', 'onCancel'],
      preview: <ModalBasicPreview />,
      code: `import { Button, Modal } from '@sci-comp/core'
import { useState } from 'react'

export function ModalBasicPreview() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        打开基础弹窗
      </Button>
      <Modal
        open={open}
        title="确认发布"
        okText="确认"
        cancelText="取消"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        请确认当前配置后再继续发布。
      </Modal>
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '帮助读者确认 Modal 的第一入口仍然是 antd 风格的受控开关模型。',
        highlights: [
          '`open` 控制弹窗显隐。',
          '`onOk` 与 `onCancel` 仍是最核心的结果回收方式。',
        ],
        boundaries: [
          '如果只是页面内轻提示，不应默认升级为 Modal。',
          '更复杂的确认链路仍应由业务层决定，不应堆进基础 wrapper。',
        ],
      },
      editorReservation: {
        initialCode: 'ModalBasicPreview',
        supportedControls: ['open', 'title', 'onOk', 'onCancel'],
      },
    },
    {
      id: 'modal-fullscreen',
      title: '全屏弹窗',
      summary:
        '展示 `fullscreen` 的典型用法，帮助区分它是同一 Modal 心智下的尺寸与布局扩展，而不是独立页面系统。',
      relatedProps: ['fullscreen', 'width', 'footer'],
      preview: <ModalFullscreenPreview />,
      code: `import { Button, Modal } from '@sci-comp/core'
import { useState } from 'react'

export function ModalFullscreenPreview() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        打开全屏弹窗
      </Button>
      <Modal
        open={open}
        title="全屏预览"
        fullscreen
        width="100%"
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <div>这里可以承载更大体量的预览内容。</div>
      </Modal>
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明 `fullscreen` 主要服务于内容承载空间扩展，而不是引入新的弹窗体系。',
        highlights: [
          '`fullscreen` 会在同一 Modal 交互模型下切换到更大的布局表现。',
          '仍然沿用 Modal 的遮罩、开关与关闭回调语义。',
        ],
        boundaries: [
          '复杂工作台式全屏交互不应默认通过基础 Modal wrapper 承担。',
          '如果场景本质已接近独立页面，应考虑页面路由而不是继续放大弹窗。',
        ],
      },
      editorReservation: {
        initialCode: 'ModalFullscreenPreview',
        supportedControls: ['fullscreen', 'width', 'footer'],
      },
    },
    {
      id: 'modal-form',
      title: '承载表单内容',
      summary:
        '展示 Modal 内承载基础表单的常见方式，帮助说明它适合局部编辑和短流程创建。',
      relatedProps: ['open', 'title', 'children'],
      preview: <ModalFormPreview />,
      code: `import { Button, Form, Input, Modal } from '@sci-comp/core'
import { useState } from 'react'

export function ModalFormPreview() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        打开表单弹窗
      </Button>
      <Modal
        open={open}
        title="创建组件"
        okText="提交"
        cancelText="取消"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <Form style={{ maxWidth: '420px' }}>
          <Form.Item label="组件名称" name="name">
            <Input placeholder="请输入组件名称" />
          </Form.Item>
          <Form.Item label="组件编码" name="code">
            <Input placeholder="请输入组件编码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}`,
      sourceDetails: {
        purpose: '帮助说明 Modal 适合作为局部创建、编辑与确认流程的内容容器。',
        highlights: [
          '弹窗内容区可以直接承载基础 Form。',
          '适合短流程录入，不必额外设计独立页面。',
        ],
        boundaries: [
          '如果表单步骤过多或编排复杂，应优先考虑页面级表单。',
          'Modal 本身不负责动态表单逻辑与复杂提交编排。',
        ],
      },
      editorReservation: {
        initialCode: 'ModalFormPreview',
        supportedControls: ['open', 'title', 'children'],
      },
    },
    {
      id: 'modal-loading',
      title: '提交中状态',
      summary:
        '通过 `confirmLoading` 展示确认按钮的处理中反馈，帮助用户区分“等待提交结果”和“可再次点击”的状态。',
      relatedProps: ['confirmLoading', 'onCancel', 'okText'],
      preview: <ModalLoadingPreview />,
      code: `import { Button, Modal } from '@sci-comp/core'
import { useState } from 'react'

export function ModalLoadingPreview() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        打开确认弹窗
      </Button>
      <Modal
        open={open}
        title="确认提交"
        okText="提交中"
        cancelText="取消"
        confirmLoading
        onCancel={() => setOpen(false)}
      >
        当前示例用于演示提交中状态下的确认按钮反馈。
      </Modal>
    </>
  )
}`,
      sourceDetails: {
        purpose:
          '说明确认按钮的加载状态应通过 antd 原生语义表达，而不是自定义额外按钮系统。',
        highlights: [
          '`confirmLoading` 适合表达确认动作已经开始执行。',
          '能减少用户重复点击确认按钮的概率。',
        ],
        boundaries: [
          '如果提交流程跨多步或涉及轮询，不应只依赖一个按钮 loading 解决全部反馈。',
          '页面仍应根据业务需要补充结果提示或后续跳转。',
        ],
      },
      editorReservation: {
        initialCode: 'ModalLoadingPreview',
        supportedControls: ['confirmLoading', 'onCancel', 'okText'],
      },
    },
  ],
  api: [
    {
      name: 'open',
      description: '控制弹窗显隐的核心受控属性。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '沿用 antd Modal 原生心智。',
    },
    {
      name: 'title',
      description: '弹窗标题，适合承载操作名称或当前流程上下文。',
      type: 'ReactNode',
      defaultValue: '-',
      notes: '来自 antd 原生透传。',
    },
    {
      name: 'fullscreen',
      description: '切换为全屏布局语义，适合更大内容承载空间。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '是对同一 Modal 心智的布局扩展，不是独立弹窗体系。',
    },
    {
      name: 'onOk',
      description: '确认按钮点击回调。',
      type: '() => void',
      defaultValue: '-',
      notes: '高频用于确认、提交和发布类流程。',
    },
    {
      name: 'onCancel',
      description: '取消或关闭弹窗时的回调。',
      type: '() => void',
      defaultValue: '-',
      notes: '沿用 antd 原生关闭模型。',
    },
    {
      name: 'confirmLoading',
      description: '控制确认按钮的加载状态。',
      type: 'boolean',
      defaultValue: 'false',
      notes: '适合提交中、确认中等短时处理反馈。',
    },
    {
      name: 'width',
      description: '控制弹窗宽度或布局尺寸。',
      type: 'string | number',
      defaultValue: '-',
      notes: '与 `fullscreen` 组合时常用于大体量内容展示。',
    },
    {
      name: 'footer',
      description: '自定义或关闭底部操作区。',
      type: 'ReactNode | null',
      defaultValue: '-',
      notes: '来自 antd 原生透传。',
    },
  ],
  selectionTips: [
    '短流程确认、局部编辑和轻量配置优先考虑 Modal。',
    '需要更大内容承载空间时可使用 `fullscreen`，但仍应保持弹窗式交互预期。',
    '如果交互已演变成复杂工作台或多步骤页面，优先考虑独立页面而不是继续扩展基础 Modal。',
  ],
  wrapperNotes: [
    'Modal 仍然基于 antd Modal 实现，未引入额外的弹窗 DSL 或流程引擎。',
    'API 主表只覆盖帮助理解 wrapper 与高频业务写法的关键字段，不等同于 antd Modal 的全量参数文档。',
    '复杂工作台式全屏交互、长流程编排和业务权限逻辑应由更高阶容器承载，而不是继续堆在基础 Modal wrapper 中。',
  ],
}
