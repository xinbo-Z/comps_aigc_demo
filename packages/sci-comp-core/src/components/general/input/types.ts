import type { InputProps as AntInputProps } from 'antd'
import type { ReactNode } from 'react'

export interface InputProps extends Omit<AntInputProps, 'status'> {
  label?: ReactNode
  helperText?: ReactNode
  invalid?: boolean
}
