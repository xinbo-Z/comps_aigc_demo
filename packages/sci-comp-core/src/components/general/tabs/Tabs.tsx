import { useMemo } from 'react'
import { Tabs as AntTabs } from 'antd'
import type { TabsProps } from './types'

/**
 * Tabs 标签页组件
 *
 * 基于 Ant Design Tabs 封装，支持懒加载
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { key: '1', label: 'Tab 1', children: <div>Content 1</div> },
 *     { key: '2', label: 'Tab 2', children: <div>Content 2</div> },
 *   ]}
 * />
 * ```
 */
export function Tabs({ items, lazy = true, ...restProps }: TabsProps) {
  const mergedItems = useMemo(
    () =>
      lazy
        ? items
        : items?.map((item) => ({
            ...item,
            forceRender: item?.forceRender ?? true,
          })),
    [items, lazy],
  )

  return <AntTabs {...restProps} items={mergedItems} />
}
