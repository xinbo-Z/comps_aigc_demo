import * as React from 'react'
import { Input as AntInput, type InputRef } from 'antd'
import styles from './Input.module.css'
import type { InputProps } from './types'

/**
 * 合并多个类名部分，过滤掉 falsy 值
 */
function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

/**
 * Input 输入框组件
 *
 * 基于 Ant Design Input 封装，添加了标签和辅助文字支持
 *
 * @example
 * ```tsx
 * <Input
 *   label="用户名"
 *   placeholder="请输入用户名"
 *   helperText="用户名由字母、数字组成"
 * />
 * ```
 */
export const Input = React.forwardRef<InputRef, InputProps>(function Input(
  {
    label,
    helperText,
    invalid = false,
    id,
    className,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...restProps
  },
  ref,
) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const helperTextId = helperText ? `${inputId}-helper` : undefined
  const describedBy =
    [ariaDescribedBy, helperTextId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <AntInput
        {...restProps}
        ref={ref}
        id={inputId}
        className={getClassName([styles.input, className])}
        status={invalid ? 'error' : undefined}
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid === true ? true : ariaInvalid}
      />
      {helperText ? (
        <div
          id={helperTextId}
          className={getClassName([
            styles.helperText,
            invalid && styles.errorText,
          ])}
          role={invalid ? 'alert' : undefined}
        >
          {helperText}
        </div>
      ) : null}
    </div>
  )
})
