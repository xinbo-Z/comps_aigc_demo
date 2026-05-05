import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '../support/render'
import {
  ComponentDocPage,
  type ComponentDocPageData,
} from '../../../sci-comp-documention/doc-components/ComponentDoc'
import { tableDocPage } from '../../../sci-comp-documention/doc-components/component-doc-data/tableDoc'

const page: ComponentDocPageData = {
  title: 'Button',
  description: '按钮组件说明',
  definition: ['用于触发页面中的主要操作。'],
  scenarios: ['适用于提交、确认、切换等高频动作。'],
  examples: [
    {
      id: 'basic',
      title: '基础按钮示例',
      summary: '展示文档预览区与源码区骨架。',
      relatedProps: ['variant', 'size'],
      preview: <button type="button">预览按钮</button>,
      code: '<Button variant="primary">预览按钮</Button>',
      sourceDetails: {
        purpose: '用于演示通用展示骨架。',
        highlights: ['展示预览区', '支持源码展开'],
        boundaries: ['这里只覆盖文档层骨架'],
      },
    },
  ],
  api: [
    {
      name: 'variant',
      description: '控制按钮语义样式。',
      type: "'primary' | 'secondary' | 'ghost'",
      defaultValue: "'primary'",
      notes: '透传到 wrapper 语义变体。',
    },
  ],
  wrapperNotes: ['文档展示层应复用统一卡片与代码容器样式。'],
  selectionTips: ['主流程优先使用 primary 语义。'],
}

describe('ComponentDocPage', () => {
  it('renders shared documentation surfaces inside the theme test providers', async () => {
    render(<ComponentDocPage page={page} />)

    expect(screen.getByText('组件定义')).toBeInTheDocument()
    expect(screen.getByText('基础按钮示例')).toBeInTheDocument()
    expect(screen.getAllByText('variant').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: '展开代码' }))

    expect(
      screen.getByText('<Button variant="primary">预览按钮</Button>'),
    ).toBeInTheDocument()
    expect(screen.getByText('选型建议')).toBeInTheDocument()
    expect(screen.getByText('封装说明')).toBeInTheDocument()
  })

  it('renders table column resize documentation content inside the component doc page', () => {
    render(<ComponentDocPage page={tableDocPage} />)

    expect(screen.getByText('列宽拖拽')).toBeInTheDocument()
    expect(screen.getAllByText(/onColumnsChange/i).length).toBeGreaterThan(0)
    expect(
      screen.getAllByText(/grouped columns 不渲染拖拽手柄/i).length,
    ).toBeGreaterThan(0)
  })
})
