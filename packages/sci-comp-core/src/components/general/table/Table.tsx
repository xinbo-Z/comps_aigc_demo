import { Table as AntTable } from 'antd'
import type { TableProps } from './types'

export function Table<RecordType extends object = Record<string, unknown>>({
  virtualScroll,
  scroll,
  ...restProps
}: TableProps<RecordType>) {
  // Preserve caller-provided horizontal scroll defaults while letting virtualScroll
  // opt the table into Ant Design virtualization with a required vertical height.
  const mergedScroll = virtualScroll
    ? {
        ...scroll,
        x: virtualScroll.x ?? scroll?.x,
        y: virtualScroll.y,
      }
    : scroll

  return <AntTable<RecordType> {...restProps} scroll={mergedScroll} virtual={Boolean(virtualScroll)} />
}
