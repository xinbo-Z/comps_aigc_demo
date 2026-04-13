import * as React from 'react'
import { Input as AntInput } from 'antd'
import styles from './Input.module.css'
import type { InputProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Input({
  label,
  helperText,
  invalid = false,
  id,
  className,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const helperTextId = helperText ? `${inputId}-helper` : undefined
  const describedBy = [ariaDescribedBy, helperTextId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <AntInput
        {...restProps}
        id={inputId}
        className={getClassName([styles.input, className])}
        status={invalid ? 'error' : undefined}
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid === true ? true : ariaInvalid}
      />
      {helperText ? (
        <div
          id={helperTextId}
          className={getClassName([styles.helperText, invalid && styles.errorText])}
          role={invalid ? 'alert' : undefined}
        >
          {helperText}
        </div>
      ) : null}
    </div>
  )
}
