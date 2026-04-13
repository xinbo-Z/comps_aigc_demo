import type { ButtonProps as AntButtonProps } from 'antd'
import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'text'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonHtmlType = NonNullable<AntButtonProps['htmlType']>

export interface ButtonProps
  extends Omit<
    AntButtonProps,
    'children' | 'danger' | 'ghost' | 'htmlType' | 'icon' | 'loading' | 'size' | 'type' | 'variant'
  > {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  type?: ButtonHtmlType
}
