import { describe, expect, expectTypeOf, test } from 'vitest'
import { Progress, type ProgressProps } from '@sci-comp/core'
import type { ProgressProps as PublicProgressProps } from '@sci-comp/core'
import { render, screen } from '../../../support/render'

describe('Progress', () => {
  test('re-exports ProgressProps from the public package entrypoint', () => {
    expectTypeOf<PublicProgressProps>().toEqualTypeOf<ProgressProps>()
  })

  test('renders line progress with visible percent text', () => {
    render(<Progress percent={60} />)

    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  test('hides percent text when showInfo is false', () => {
    render(<Progress percent={60} showInfo={false} />)

    expect(screen.queryByText('60%')).toBeNull()
  })

  test('renders custom formatted text', () => {
    render(<Progress percent={60} format={(percent) => `已完成 ${percent}%`} />)

    expect(screen.getByText('已完成 60%')).toBeInTheDocument()
  })

  test('renders success segment when success percent is provided', () => {
    const { container } = render(
      <Progress percent={60} success={{ percent: 30 }} />,
    )

    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(container.querySelector('.ant-progress-line')).not.toBeNull()
  })

  test('renders circle progress', () => {
    const { container } = render(<Progress type="circle" percent={75} />)

    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(container.querySelector('.ant-progress-circle')).not.toBeNull()
  })

  test('renders dashboard progress', () => {
    const { container } = render(<Progress type="dashboard" percent={70} />)

    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(container.querySelector('.ant-progress-circle')).not.toBeNull()
  })
})
