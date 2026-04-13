import { useMemo } from 'react'
import { Tabs as AntTabs } from 'antd'
import type { TabsProps } from './types'

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
