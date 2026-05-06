import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '../support/render'
import {
  ComponentDocExampleBlock,
  ComponentDocPage,
  type ComponentDocPageData,
} from '../../../sci-comp-documention/doc-components/ComponentDoc'
import { buttonDocPage } from '../../../sci-comp-documention/doc-components/component-doc-data/buttonDoc'
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

const pageWithoutSelectionTips: ComponentDocPageData = {
  ...page,
  selectionTips: undefined,
}

describe('ComponentDocPage', () => {
  it('renders shared documentation surfaces inside the theme test providers', async () => {
    render(<ComponentDocPage page={page} />)

    expect(screen.getByText('用于触发页面中的主要操作。')).toBeInTheDocument()
    expect(screen.getByText('预览按钮')).toBeInTheDocument()
    expect(screen.getAllByText('variant').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('button', { name: '展开代码' }))

    expect(
      screen.getByText('<Button variant="primary">预览按钮</Button>'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('主流程优先使用 primary 语义。'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('文档展示层应复用统一卡片与代码容器样式。'),
    ).toBeInTheDocument()
  })

  it('keeps stable anchors for sections and examples without rendering custom navigation', () => {
    const { container } = render(<ComponentDocPage page={page} />)

    expect(
      screen.queryByRole('link', { name: '组件定义' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: '基础按钮示例' }),
    ).not.toBeInTheDocument()
    expect(container.querySelector('#definition')).not.toBeNull()
    expect(container.querySelector('#scenarios')).not.toBeNull()
    expect(container.querySelector('#examples')).not.toBeNull()
    expect(container.querySelector('#api')).not.toBeNull()
    expect(container.querySelector('#selection-tips')).not.toBeNull()
    expect(container.querySelector('#wrapper-notes')).not.toBeNull()
    expect(container.querySelector('#basic')).not.toBeNull()
  })

  it('filters optional content sections when the page omits selection tips', () => {
    const { container } = render(
      <ComponentDocPage page={pageWithoutSelectionTips} />,
    )

    expect(container.querySelector('#selection-tips')).toBeNull()
    expect(
      screen.queryByText('主流程优先使用 primary 语义。'),
    ).not.toBeInTheDocument()
  })

  it('renders table column resize documentation content inside the component doc page', () => {
    render(<ComponentDocExampleBlock example={tableDocPage.examples[5]} />)

    expect(screen.getAllByText(/onColumnsChange/i).length).toBeGreaterThan(0)
    expect(
      screen.getAllByText(/grouped columns 不渲染拖拽手柄/i).length,
    ).toBeGreaterThan(0)
  })

  it('renders enhanced decision content for Button and Input docs', () => {
    const { rerender } = render(<ComponentDocPage page={buttonDocPage} />)

    expect(
      screen.getByText(/跳转到详情页、文档页或外部站点的动作优先使用 Link/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Button wrapper 主要负责主次层级、危险语义和基础状态表达/i,
      ),
    ).toBeInTheDocument()

    rerender(
      <ComponentDocPage
        page={
          {
            title: 'Input',
            description: '输入组件说明',
            definition: ['保持与 antd Input 一致的基础输入心智。'],
            scenarios: ['适用于表单与筛选区的基础输入。'],
            examples: [
              {
                id: 'input-readonly',
                title: '禁用态与只读态',
                summary: '区分字段不可操作与可查看不可编辑的差异。',
                relatedProps: ['invalid', 'disabled', 'readOnly'],
                preview: <input value="版本号" readOnly />,
                code: '<Input readOnly value="版本号" />',
                sourceDetails: {
                  purpose: '验证 Input 页的状态语义增强。',
                  highlights: [
                    '`disabled` 更适合当前不可交互、也不希望用户聚焦尝试编辑的字段。',
                    '`readOnly` 更适合允许聚焦查看、复制内容但不允许修改的字段。',
                    '`invalid` 应用于当前值需要纠正或校验失败的场景，而不是替代禁用或只读语义。',
                  ],
                  boundaries: ['这里只覆盖状态语义与职责边界。'],
                },
              },
            ],
            api: [
              {
                name: 'invalid',
                description: '标记当前输入为错误态。',
                type: 'boolean',
                defaultValue: 'false',
              },
            ],
            selectionTips: [
              '`invalid` 用于表达当前值需要修正，`disabled` 用于当前不可操作，`readOnly` 用于允许查看但不允许编辑。',
            ],
            wrapperNotes: [
              '`label`、`helperText` 与 `invalid` 负责字段级展示和轻量错误表达；整体验证时机、字段布局与提交流程继续由 Form 或业务容器负责。',
            ],
          } satisfies ComponentDocPageData
        }
      />,
    )

    expect(
      screen.getByText(
        /`invalid` 用于表达当前值需要修正，`disabled` 用于当前不可操作/i,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /整体验证时机、字段布局与提交流程继续由 Form 或业务容器负责/i,
      ),
    ).toBeInTheDocument()
  })
})
