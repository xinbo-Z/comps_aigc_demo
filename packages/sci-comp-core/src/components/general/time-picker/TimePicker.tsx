import * as React from 'react'
import { TimePicker as AntTimePicker } from 'antd'
import type { PickerRef } from '@rc-component/picker'
import styles from './TimePicker.module.css'
import type { TimePickerProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const TimePicker = React.forwardRef<PickerRef, TimePickerProps>(
  function TimePicker({ format = 'HH:mm:ss', className, ...restProps }, ref) {
    return (
      <AntTimePicker
        {...restProps}
        ref={ref}
        format={format}
        className={getClassName([styles.picker, className])}
      />
    )
  },
)
