import { describe, expect, it } from 'vitest'
import { ComponentDocPage } from '../../../sci-comp-documention/doc-components/ComponentDoc'
import { render, screen } from './render'

describe('render', () => {
  it('renders children with shared providers', () => {
    const { container } = render(<span>hello</span>)

    expect(screen.getByText('hello')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveStyle({
      '--sci-color-action-primary': '#1677ff',
      '--accent': '#1677ff',
    })
  })

  it('renders component docs with shared theme variables', () => {
    const { container } = render(
      <ComponentDocPage
        page={{
          title: 'Input',
          description: '输入组件说明',
          definition: ['保持与 antd Input 一致的基础输入心智。'],
          scenarios: ['适用于表单与筛选区的基础输入。'],
          examples: [
            {
              id: 'input-basic',
              title: '基础输入',
              summary: '展示文档页预览与源码骨架。',
              relatedProps: ['placeholder'],
              preview: <input placeholder="请输入内容" />,
              code: '<Input placeholder="请输入内容" />',
              sourceDetails: {
                purpose: '验证文档页在测试主题环境下可渲染。',
                highlights: ['共享 providers 可注入主题变量。'],
                boundaries: ['这里只覆盖渲染与主题入口。'],
              },
            },
          ],
          api: [
            {
              name: 'placeholder',
              description: '输入占位提示。',
              type: 'string',
              defaultValue: '-',
            },
          ],
          wrapperNotes: ['文档页展示层继续复用统一主题变量入口。'],
        }}
      />,
      {
        themeOverrides: {
          colorPrimary: '#7c3aed',
        },
      },
    )

    expect(
      screen.getByText('保持与 antd Input 一致的基础输入心智。'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('文档页展示层继续复用统一主题变量入口。'),
    ).toBeInTheDocument()
    expect(container.querySelector('#definition')).not.toBeNull()
    expect(container.querySelector('#input-basic')).not.toBeNull()
    expect(container.firstElementChild).toHaveStyle({
      '--sci-color-action-primary': '#7c3aed',
    })
  })
})
