import { Progress as AntProgress } from 'antd'
import type { ProgressProps } from './types'

/**
 * Progress 进度条组件
 *
 * 基于 Ant Design Progress 封装的简单包装组件
 *
 * @example
 * ```tsx
 * <Progress percent={50} />
 * ```
 */
export function Progress(props: ProgressProps) {
  return <AntProgress {...props} />
}
