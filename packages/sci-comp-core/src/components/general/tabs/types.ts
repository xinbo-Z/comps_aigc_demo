import type { TabsProps as AntTabsProps } from 'antd'

export type TabsItem = NonNullable<AntTabsProps['items']>[number]

export interface TabsProps extends Omit<AntTabsProps, 'items'> {
  items?: TabsItem[]
  lazy?: boolean
}
