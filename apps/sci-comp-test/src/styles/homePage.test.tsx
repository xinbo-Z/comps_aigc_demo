import { describe, expect, it } from 'vitest'
import { render, screen } from '../support/render'
import { HomePage } from '../../../sci-comp-documention/docs/HomePage'

describe('HomePage', () => {
  it('renders homepage hero and primary entry links inside theme providers', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { name: '你的设计系统基础' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '立即开始' })).toHaveAttribute(
      'href',
      '/guide/getting-started',
    )
    expect(screen.getByRole('link', { name: '查看组件' })).toHaveAttribute(
      'href',
      '/components/button',
    )
    expect(screen.getByText('核心特性')).toBeInTheDocument()
    expect(screen.getByText('组件预览')).toBeInTheDocument()
  })
})
