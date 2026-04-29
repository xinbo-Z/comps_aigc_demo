import { describe, expect, it } from 'vitest'
import { render, screen } from '../support/render'
import { ThemePlayground } from '../../../sci-comp-documention/doc-components/theme-system/ThemePlayground'

describe('ThemePlayground', () => {
  it('renders unified theme outputs from one override source', () => {
    render(
      <ThemePlayground
        initialOverrides={{ colorPrimary: '#667eea', borderRadius: 10 }}
      />,
    )

    expect(screen.getByText('主题演示工作台')).toBeInTheDocument()
    expect(screen.getByDisplayValue('#667eea')).toBeInTheDocument()
    expect(screen.getByText('CSS Variables 输出')).toBeInTheDocument()
    expect(screen.getByText('兼容变量映射')).toBeInTheDocument()
    expect(
      screen.getAllByText((content) =>
        content.includes('--sci-color-action-primary'),
      ).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText((content) =>
        content.includes('--accent → --sci-color-action-primary'),
      ).length,
    ).toBeGreaterThan(0)
  })
})
