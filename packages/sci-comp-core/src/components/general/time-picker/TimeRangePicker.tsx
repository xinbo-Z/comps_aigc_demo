import * as React from 'react'
import { TimePicker as AntTimePicker } from 'antd'
import type { PickerRef } from '@rc-component/picker'
import styles from './TimePicker.module.css'
import type { TimeRangePickerProps } from './types'

function getClassName(parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const TimeRangePicker = React.forwardRef<
  PickerRef,
  TimeRangePickerProps
>(function TimeRangePicker(
  { format = 'HH:mm:ss', className, ...restProps },
  ref,
) {
  return (
    <AntTimePicker.RangePicker
      {...restProps}
      ref={ref}
      format={format}
      className={getClassName([styles.picker, className])}
    />
  )
})
