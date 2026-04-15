import { Progress as AntProgress } from 'antd'
import type { ProgressProps } from './types'

export function Progress(props: ProgressProps) {
  return <AntProgress {...props} />
}
